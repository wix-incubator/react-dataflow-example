// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  topicsByUrl: undefined,
  selectedTopicUrls: [],
  selectionFinalized: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOPICS_FETCHED:
      return state.merge({
        topicsByUrl: action.topicsByUrl
      });
    case types.TOPICS_SELECTED:
      return state.merge({
        selectedTopicUrls: action.selectedTopicUrls
      });
    case types.TOPIC_SELECTION_FINALIZED:
      return state.merge({
        selectionFinalized: true
      });
    default:
      return state;
  }
}

// selectors

export function getTopics(state) {
  const topicsByUrl = state.topics.topicsByUrl;
  const topicsUrlArray = _.keys(topicsByUrl);
  return [topicsByUrl, topicsUrlArray];
}

export function getSelectedTopicUrls(state) {
  return state.topics.selectedTopicUrls;
}

export function getSelectedTopicsByUrl(state) {
  return _.mapValues(_.keyBy(state.topics.selectedTopicUrls), (topicUrl) => state.topics.topicsByUrl[topicUrl]);
}

export function isTopicSelectionValid(state) {
  return state.topics.selectedTopicUrls.length === 3;
}

export function isTopicSelectionFinalized(state) {
  return state.topics.selectionFinalized;
}
