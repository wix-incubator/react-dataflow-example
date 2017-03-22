import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../actionTypes';

const initialState = {
  postsById: undefined,
  currentFilter: 'all',
  currentPostId: undefined
};

describe('store/posts/reducer', () => {
  it('should have initial state', () => {
    expect(uut()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should store fetched posts', () => {
    const postsById = {id1: 'post1', id2: 'post2'};
    const action = {type: actionTypes.POSTS_FETCHED, postsById};
    Reducer(uut).expect(action).toReturnState({...initialState, postsById});
    const existingState = Immutable({...initialState, postsById: {id3: 'post3'}});
    Reducer(uut, existingState).expect(action).toReturnState({...initialState, postsById});
  });

  it('should update current post filter', () => {
    const filter = 'cats';
    const action = {type: actionTypes.FILTER_CHANGED, filter};
    Reducer(uut).expect(action).toReturnState({...initialState, currentFilter: filter});
  });

  it('should update selected post id', () => {
    const postId = 'id1';
    const action = {type: actionTypes.POST_SELECTED, postId};
    Reducer(uut).expect(action).toReturnState({...initialState, currentPostId: postId});
  });

});
