import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  loading: true,
  topicsByUrl: {},
  selectedTopics: []
});

export const setters = remx.setters({
  setTopics(topics) {
    state.topicsByUrl = _.keyBy(topics, (t) => t.url);
    state.loading = false;
  },

  toggleTopic(topicUrl) {
    if (getters.isTopicSelected(topicUrl)) {
      _.remove(state.selectedTopics, _.matches(topicUrl));
    } else {
      state.selectedTopics.push(topicUrl);
    }
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
  },

  isTopicSelected(topicUrl) {
    return _.includes(state.selectedTopics, topicUrl);
  }
});
