import _ from 'lodash';
import * as reddit from '../../services/reddit';
import * as topicsStore from '../topics/store';
import * as store from './store';

export async function fetchPosts() {
  const selectedTopicUrls = topicsStore.getters.getSelectedTopicUrls();
  const promises = _.map(selectedTopicUrls, (url) => reddit.getPostsFromSubreddit(url));
  const allPostsArrays = await Promise.all(promises);
  const allPosts = _.flatten(allPostsArrays);
  store.setters.setPosts(allPosts);
}
