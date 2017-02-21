import _ from 'lodash';
import * as remx from 'remx';

const MAX_TOPICS_SELECTED = 3;

const state = remx.state({
  loading: true,
  topicsByUrl: {},
  selectedTopicUrls: [],
  finishedTopicsSelection: false
});

export const setters = remx.setters({
  setTopics(topics) {
    state.topicsByUrl = _.keyBy(topics, (t) => t.url);
    state.loading = false;
  },

  toggleTopic(topicUrl) {
    if (getters.isTopicSelected(topicUrl)) {
      state.selectedTopicUrls = _.without(state.selectedTopicUrls, topicUrl);
    } else {
      state.selectedTopicUrls.push(topicUrl);
      state.selectedTopicUrls = _.takeRight(state.selectedTopicUrls, MAX_TOPICS_SELECTED);
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
    return _.includes(state.selectedTopicUrls, topicUrl);
  },

  getSelectedTopicUrls() {
    return remx.toJS(state.selectedTopicUrls);
  },

  getSelectedTopicsByUrl() {
    return _.mapValues(_.keyBy(state.selectedTopicUrls), (url) => state.topicsByUrl[url]);
  },

  canFinishTopicsSelection() {
    return _.size(state.selectedTopicUrls) === MAX_TOPICS_SELECTED;
  },

  isFinishedTopicsSelection() {
    return state.finishedTopicsSelection;
  }
});
