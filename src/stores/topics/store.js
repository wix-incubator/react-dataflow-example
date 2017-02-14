import _ from 'lodash';

const state = {
  loading: true,
  topicsByUrl: {}
};

export const setters = {
  setTopics(topics) {
    state.topicsByUrl = _.keyBy(topics, (t) => t.url);
    state.loading = false;
  }
};

export const getters = {
  isLoading() {
    return state.loading;
  },

  getAllTopicsByUrl() {
    return state.topicsByUrl;
  }
};
