import Immutable from 'seamless-immutable';
import * as uut from '../reducer';

const state = Immutable({
  topics: {
    selectedTopicUrls: [],
    topicsByUrl: {
      'url1': {
        url: 'url1',
        title: 'topic1',
        description: 'description1'
      },
      'url2': {
        url: 'url2',
        title: 'topic2',
        description: 'description2'
      },
    },
    selectedTopicUrls: ['url1'],
    selectionFinalized: false
  }
});

describe('store/topics/selectors', () => {

  it('should get topics', () => {
    const [topicsByUrl, topicsUrlArray] = uut.getTopics(state);
    expect(topicsByUrl).toBe(state.topics.topicsByUrl);
    expect(topicsUrlArray).toEqual(['url1', 'url2']);
  });

  it('should get selected topics URLs', () => {
    expect(uut.getSelectedTopicUrls(state)).toBe(state.topics.selectedTopicUrls);
  });

  it('should get selected topics by URL', () => {
    const selectedTopicUrl = state.topics.selectedTopicUrls[0];
    const selectedTopic = state.topics.topicsByUrl[selectedTopicUrl];
    expect(uut.getSelectedTopicsByUrl(state)).toEqual({[selectedTopicUrl]: selectedTopic});
  });

  it('should return if topic selection is valid', () => {
    expect(uut.isTopicSelectionValid(state)).toBe(false);
    expect(uut.isTopicSelectionValid({topics: {selectedTopicUrls: ['1', '2', '3']}})).toBe(true);
  });

  it('should return if if topic selection is finalized', () => {
    expect(uut.isTopicSelectionFinalized(state)).toBe(false);
    expect(uut.isTopicSelectionFinalized({topics: {selectionFinalized: true}})).toBe(true);
  });

});
