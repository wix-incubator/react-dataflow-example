import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  loading: true,
  postsById: {},
  selectedPostId: ''
});

export const setters = remx.setters({
  setPosts(posts) {
    state.postsById = _.keyBy(posts, (p) => p.id);
    state.loading = false;
  },

  selectPost(postId) {
    state.selectedPostId = postId;
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
    return _.get(state.postsById, state.selectedPostId);
  }
});
