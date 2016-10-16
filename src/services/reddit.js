// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

const REDDIT_ENDPOINT = 'https://www.reddit.com';

class RedditService {

  async getDefaultSubreddits() {
    const url = `${REDDIT_ENDPOINT}/subreddits/default.json`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    const children = _.get(data, 'data.children');
    if (!children) {
      throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
    }
    const sortedBySubscribers = _.orderBy(children, 'data.subscribers', 'desc');
    return _.map(sortedBySubscribers, (subreddit) => {
      // abstract away the specifics of the reddit API response and take only the fields we care about
      return {
        title: _.get(subreddit, 'data.display_name'),
        description: _.get(subreddit, 'data.public_description'),
        url: _.get(subreddit, 'data.url')
      }
    });
  }

  async getPostsFromSubreddit(subredditUrl) {
    const url = `${REDDIT_ENDPOINT}${subredditUrl}hot.json`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`RedditService getPostsFromSubreddit failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    const children = _.get(data, 'data.children');
    if (!children) {
      throw new Error(`RedditService getPostsFromSubreddit failed, children not returned`);
    }
    return _.map(children, (post) => {
      // abstract away the specifics of the reddit API response and take only the fields we care about
      const body = _.get(post, 'data.selftext');
      return {
        id: _.get(post, 'data.id'),
        title: _.get(post, 'data.title'),
        topicUrl: subredditUrl,
        body: body,
        thumbnail: this._validateUrl(_.get(post, 'data.thumbnail')),
        url: !body ? this._validateUrl(_.get(post, 'data.url')) : undefined
      }
    });
  }

  _validateUrl(url = '') {
    return url.startsWith('http') ? url : undefined;
  }

}

export default new RedditService();
