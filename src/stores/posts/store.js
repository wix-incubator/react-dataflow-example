import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  loading: true,
  postsById: {},
  selectedPost: undefined
});

export const setters = remx.setters({
  setPosts(posts) {
    state.postsById = _.keyBy(posts, (p) => p.id);
    state.loading = false;
  },

  selectPost(post) {
    state.selectedPost = post;
  }
});

export const getters = remx.getters({
  isLoading() {
    return state.loading;
  },

  getPostsById() {
    return state.postsById;
  },

  getPostsIdsArray() {
    return _.keys(state.postsById);
  },

  getSelectedPost() {
    return state.selectedPost;
  }
});
