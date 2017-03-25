import _ from 'lodash';
import Immutable from 'seamless-immutable';
import * as uut from '../reducer';

const emptyState = Immutable({
  topics: {
    topicsByUrl: undefined,
    selectedTopicUrls: [],
    selectionFinalized: false
  }
});

const fullState = Immutable({
  topics: {
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
      'url3': {
        url: 'url3',
        title: 'topic3',
        description: 'description3'
      },
    },
    selectedTopicUrls: ['url1'],
    selectionFinalized: false
  }
});

describe('store/topics/selectors', () => {

  it('should get topics when empty', () => {
    const [topicsByUrl, topicsUrlArray] = uut.getTopics(emptyState);
    expect(topicsByUrl).toEqual(undefined);
    expect(topicsUrlArray).toEqual([]);
  });

  it('should get topics when full', () => {
    const [topicsByUrl, topicsUrlArray] = uut.getTopics(fullState);
    expect(topicsByUrl).toEqual(fullState.topics.topicsByUrl);
    expect(topicsUrlArray).toEqual(['url1', 'url2', 'url3']);
  });

  it('should get selected topics URLs', () => {
    expect(uut.getSelectedTopicUrls(emptyState)).toEqual([]);
    expect(uut.getSelectedTopicUrls(fullState)).toEqual(fullState.topics.selectedTopicUrls);
  });

  it('should get selected topics by URL', () => {
    expect(uut.getSelectedTopicsByUrl(emptyState)).toEqual({});
    expect(uut.getSelectedTopicsByUrl(fullState)).toEqual({
      url1: fullState.topics.topicsByUrl['url1']
    });
    const stateWithTwoSelected = _.cloneDeep(fullState);
    stateWithTwoSelected.topics.selectedTopicUrls = ['url1', 'url2'];
    expect(uut.getSelectedTopicsByUrl(stateWithTwoSelected)).toEqual({
      url1: fullState.topics.topicsByUrl['url1'],
      url2: fullState.topics.topicsByUrl['url2']
    });
  });

  it('should return if topic selection is valid', () => {
    expect(uut.isTopicSelectionValid(fullState)).toBe(false);
    const stateWithThreeSelected = _.cloneDeep(fullState);
    stateWithThreeSelected.topics.selectedTopicUrls = ['url1', 'url2', 'url3'];
    expect(uut.isTopicSelectionValid(stateWithThreeSelected)).toBe(true);
  });

  it('should return if topic selection is finalized', () => {
    expect(uut.isTopicSelectionFinalized(fullState)).toBe(false);
    expect(uut.isTopicSelectionFinalized({topics: {
      selectionFinalized: true
    }})).toBe(true);
  });

});
