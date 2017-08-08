import {
  extendObservable, action
} from 'mobx';
import redditService from '../services/reddit';
import autoBind from 'react-autobind';
import {flatten} from 'lodash';
export default class PostsStore {
  constructor() {
    autoBind(this);
    extendObservable(this, {
      postsList: [],
      currentFilter: 'all',
      currentPost: undefined
    });
  }

  setPostsList = action(postsList => this.postsList = postsList);
  setCurrentFilter = action(currentFilter => this.currentFilter = currentFilter);
  setCurrentPost = action((currentPost => this.currentPost = currentPost));

  async fetchPosts(topics) {
    try {
      const fetchPromises = topics.map(topic => redditService.getPostsFromSubreddit(topic.url));
      const posts = await Promise.all(fetchPromises);
      this.setPostsList(flatten(posts));
    } catch (error) {
      console.error(error);
    }
  }
}
