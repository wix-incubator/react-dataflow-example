import _ from 'lodash';

const state = {
  postsById: {}
};

export const setters = {
  setPosts(posts) {
    state.postsById = _.keyBy(posts, (p) => p.id);
  }
};

export const getters = {
  isLoading() {
    return true;
  },

  getPostsById() {
    return state.postsById;
  }
};
