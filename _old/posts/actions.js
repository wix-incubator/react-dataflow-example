// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import redditService from '../../services/reddit';
import * as topicsSelectors from '../topics/reducer';

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const selectedTopicUrls = topicsSelectors.getSelectedTopicUrls(getState());
      const fetchPromises = _.map(selectedTopicUrls, (topicUrl) => redditService.getPostsFromSubreddit(topicUrl));
      const topicPosts = await Promise.all(fetchPromises);
      const postsById = _.keyBy(_.shuffle(_.flatten(topicPosts)), (post) => post.id);
      dispatch({ type: types.POSTS_FETCHED, postsById });
    } catch (error) {
      console.error(error);
    }
  };
}

export function changeFilter(newFilter) {
  return({ type: types.FILTER_CHANGED, filter: newFilter });
}

export function selectPost(postId) {
  return({ type: types.POST_SELECTED, postId });
}
