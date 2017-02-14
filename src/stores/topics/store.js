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
      state.selectedTopics = _.without(state.selectedTopics, topicUrl);
    } else {
      state.selectedTopics.push(topicUrl);
      state.selectedTopics = _.takeRight(state.selectedTopics, 3);
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
  },

  getSelectedTopicUrls() {
    return remx.toJS(state.selectedTopics);
  }
});
