import _ from 'lodash';

const state = {
  topicsByUrl: {}
};

export const setters = {
  setTopics(topics) {
    state.topicsByUrl = _.keyBy(topics, (t) => t.url);
  }
};

export const getters = {
  isLoading() {
    return true;
  },

  getAllTopicsByUrl() {
    return state.topicsByUrl;
  }
};
