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

});
