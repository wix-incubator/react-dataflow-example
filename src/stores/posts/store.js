import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  loading: true,
  postsById: {},
  selectedPostId: '',
  currentFilter: 'all'
});

export const setters = remx.setters({
  setPosts(posts) {
    state.postsById = _.keyBy(posts, (p) => p.id);
    state.loading = false;
  },

  selectPost(postId) {
    state.selectedPostId = postId;
  },

  setFilter(filter) {
    state.currentFilter = filter;
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
    if (getters.getCurrentFilter() == 'all') {
      return _.keys(state.postsById);
    } else {
      return _.filter(state.postsById, (post) => post.topicUrl == getters.getCurrentFilter());
    }
  },

  getSelectedPost() {
    return _.get(state.postsById, state.selectedPostId);
  },

  isPostSelected(postId) {
    return !_.isEmpty(postId) && _.isEqual(state.selectedPostId, postId);
  },

  getCurrentFilter() {
    return state.currentFilter || 'all';
  },

  isPostMatchesFilter(post) {
    const filter = getters.getCurrentFilter();
    return _.isEqual(filter, 'all') || _.isEqual(filter, post.topicUrl);
  }
});
