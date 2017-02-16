import _ from 'lodash';
import * as remx from 'remx';

const MAX_TOPICS_SELECTED = 3;

const state = remx.state({
  loading: true,
  topicsByUrl: {},
  selectedTopics: [],
  finishedTopicsSelection: false
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
      state.selectedTopics = _.takeRight(state.selectedTopics, MAX_TOPICS_SELECTED);
    }
  },

  finishTopicsSelection() {
    state.finishedTopicsSelection = true;
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
    return _.keys(state.topicsByUrl);
  },

  isTopicSelected(topicUrl) {
    return _.includes(state.selectedTopics, topicUrl);
  },

  getSelectedTopicUrls() {
    return remx.toJS(state.selectedTopics);
  },

  canFinishTopicsSelection() {
    return _.size(state.selectedTopics) === MAX_TOPICS_SELECTED;
  },

  isFinishedTopicsSelection() {
    return state.finishedTopicsSelection;
  }
});
