// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service.
// More importantly, these are the boundary objects, implementing the interface for all external dependencies.
// These can include http requests, db (both local and remote), and even static UI operations.
// These all should be PLUGINS to the application.

import _ from 'lodash';
import * as http from './http';

const REDDIT_ENDPOINT = 'https://www.reddit.com';
const DEFAULT_SUBREDDITS_ENDPOINT = `${REDDIT_ENDPOINT}/subreddits/default.json`;

export async function getDefaultSubreddits() {
  const subreddits = await fetchAndValidateSubreddits();
  return _parseSubreddit(subreddits);
}

export async function getPostsFromSubreddit(subredditUrl) {
  const posts = await _fetchPostsAndValidate(subredditUrl);
  return _parsePosts(posts, subredditUrl);
}

async function fetchAndValidateSubreddits() {
  const data = await http.get(DEFAULT_SUBREDDITS_ENDPOINT);
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
  }
  return children;
}

// abstract away the specifics of the reddit API response and take only the fields we care about
function _parseSubreddit(subreddits) {
  return _.map(subreddits, (subreddit) => {
    return {
      title: _.get(subreddit, 'data.display_name'),
      description: _.get(subreddit, 'data.public_description'),
      url: _.get(subreddit, 'data.url'),
      subscribers: _.get(subreddit, 'data.subscribers')
    }
  });
}

async function _fetchPostsAndValidate(subredditUrl) {
  const data = await http.get(`${REDDIT_ENDPOINT}${subredditUrl}hot.json`);
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getPostsFromSubreddit failed, children not returned`);
  }
  return children;
}

// abstract away the specifics of the reddit API response and take only the fields we care about
function _parsePosts(posts, subredditUrl) {
  return _.map(posts, (post) => {
    const body = _.get(post, 'data.selftext');
    return {
      id: _.get(post, 'data.id'),
      title: _.get(post, 'data.title'),
      topicUrl: subredditUrl,
      body: body,
      thumbnail: _validateUrl(_.get(post, 'data.thumbnail')),
      url: !body ? _validateUrl(_.get(post, 'data.url'), '') : undefined
    }
  });
}

function _validateUrl(url) {
  return url.startsWith('http') ? url : undefined;
}
