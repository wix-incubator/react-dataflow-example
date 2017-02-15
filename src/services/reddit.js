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
  const data = await http.get(DEFAULT_SUBREDDITS_ENDPOINT);
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
  }
  return _.map(children, (subreddit) => {
    // abstract away the specifics of the reddit API response and take only the fields we care about
    return {
      title: _.get(subreddit, 'data.display_name'),
      description: _.get(subreddit, 'data.public_description'),
      url: _.get(subreddit, 'data.url'),
      subscribers: _.get(subreddit, 'data.subscribers')
    }
  });
}


