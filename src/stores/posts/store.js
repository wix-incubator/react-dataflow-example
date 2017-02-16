import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  loading: true,
  postsById: {}
});

export const setters = remx.setters({
  setPosts(posts) {
    state.postsById = _.keyBy(posts, (p) => p.id);
    state.loading = false;
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
  }
});
