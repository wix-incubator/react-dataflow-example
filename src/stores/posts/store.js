import _ from 'lodash';

const state = {
  loading: true,
  postsById: {}
};

export const setters = {
  setPosts(posts) {
    state.postsById = _.keyBy(posts, (p) => p.id);
    state.loading = false;
  }
};

export const getters = {
  isLoading() {
    return state.loading;
  },

  getPostsById() {
    return state.postsById;
  }
};
