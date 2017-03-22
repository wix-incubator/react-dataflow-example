import { Reducer } from 'redux-testkit';
import uut from '../reducer';

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
  
});
