import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../actionTypes';

const initialState = {
  topicsByUrl: undefined,
  selectedTopicUrls: [],
  selectionFinalized: false,
};

describe('store/topics/reducer', () => {
  it('should have initial state', () => {
    expect(uut()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should store fetched topics', () => {
    const topicsByUrl = {url1: 'topic1', url2: 'topic2'};
    const action = {type: actionTypes.TOPICS_FETCHED, topicsByUrl};
    Reducer(uut).expect(action).toReturnState({...initialState, topicsByUrl});
  });

  it('should store fetched topics and override existing topics', () => {
    const existingState = Immutable({...initialState, topicsByUrl: {url3: 'topic3'}});
    const topicsByUrl = {url1: 'topic1', url2: 'topic2'};
    const action = {type: actionTypes.TOPICS_FETCHED, topicsByUrl};
    Reducer(uut, existingState).expect(action).toReturnState({...initialState, topicsByUrl});
  });

  it('should store selected topics', () => {
    const selectedTopicUrls = ['url1', 'url2'];
    const action = {type: actionTypes.TOPICS_SELECTED, selectedTopicUrls};
    Reducer(uut).expect(action).toReturnState({...initialState, selectedTopicUrls});
    const existingState = Immutable({...initialState, selectedTopicUrls: ['url3']});
    Reducer(uut, existingState).expect(action).toReturnState({...initialState, selectedTopicUrls});
  });

  it('should set topic selection flag on', () => {
    const action = {type: actionTypes.TOPIC_SELECTION_FINALIZED};
    Reducer(uut).expect(action).toReturnState({...initialState, selectionFinalized: true});
  });

});
