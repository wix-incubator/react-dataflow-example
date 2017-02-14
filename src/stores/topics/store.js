import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  loading: true,
  topicsByUrl: {}
});

export const setters = remx.setters({
  setTopics(topics) {
    state.topicsByUrl = _.keyBy(topics, (t) => t.url);
    state.loading = false;
  }
});

export const getters = remx.getters({
  isLoading() {
    return state.loading;
  },

  getAllTopicsByUrl() {
    return state.topicsByUrl;
  },

  getAllTopicsUrls() {
    return _.map(state.topicsByUrl, (t) => t.url);
  }
});
