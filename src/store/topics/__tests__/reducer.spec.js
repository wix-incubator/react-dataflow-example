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
    const exisingState = Immutable({...initialState, topicsByUrl: {url3: 'topic3'}});
    const topicsByUrl = {url1: 'topic1', url2: 'topic2'};
    const action = {type: actionTypes.TOPICS_FETCHED, topicsByUrl};
    Reducer(uut, exisingState).expect(action).toReturnState({...initialState, topicsByUrl});
  });
});
