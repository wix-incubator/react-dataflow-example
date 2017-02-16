import _ from 'lodash';
import * as reddit from '../../services/reddit';
import * as topicsStore from '../topics/store';
import * as store from './store';

export async function fetchPosts() {
  const selectedTopicUrls = topicsStore.getters.getSelectedTopicUrls();
  const promises = _.map(selectedTopicUrls, (url) => reddit.getPostsFromSubreddit(url));
  const allPostsArrays = await Promise.all(promises);
  const allPosts = _.flatten(allPostsArrays);
  const shuffled = _.shuffle(allPosts);
  store.setters.setPosts(shuffled);
}

export function selectPost(postId) {
  store.setters.selectPost(postId);
}
