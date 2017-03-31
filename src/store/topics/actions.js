// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import redditService from '../../services/reddit';
import * as topicsSelectors from './reducer';
import * as postActions from '../posts/actions';

export function fetchTopics() {
  return async(dispatch, getState) => {
    try {
      const subredditArray = await redditService.getDefaultSubreddits();
      const topicsByUrl = _.keyBy(subredditArray, (subreddit) => subreddit.url);
      dispatch({ type: types.TOPICS_FETCHED, topicsByUrl });
    } catch (error) {
      console.error(error);
    }
  };
}

export function selectTopic(topicUrl) {
  return (dispatch, getState) => {
    const selectedTopics = topicsSelectors.getSelectedTopicUrls(getState());
    let newSelectedTopics;
    if (_.indexOf(selectedTopics, topicUrl) !== -1) {
      newSelectedTopics = _.without(selectedTopics, topicUrl);
    } else {
      newSelectedTopics = selectedTopics.length < 3 ?
        selectedTopics.concat(topicUrl) :
        selectedTopics.slice(1).concat(topicUrl);
    }
    dispatch({ type: types.TOPICS_SELECTED, selectedTopicUrls: newSelectedTopics  });
    // optimization - prefetch the posts before going to the posts screen
    if (newSelectedTopics.length === 3) {
      dispatch(postActions.fetchPosts());
    }
  };
}

export function finalizeTopicSelection() {
  return({ type: types.TOPIC_SELECTION_FINALIZED });
}
