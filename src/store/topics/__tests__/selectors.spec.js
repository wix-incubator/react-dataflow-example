import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';
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
    const result = [undefined, []];
    Selector(uut.getTopics).expect(emptyState).toReturn(result);
  });

  it('should get topics when full', () => {
    const result = [fullState.topics.topicsByUrl, ['url1', 'url2', 'url3']];
    Selector(uut.getTopics).expect(fullState).toReturn(result);
  });

  it('should get selected topics URLs', () => {
    Selector(uut.getSelectedTopicUrls).expect(emptyState).toReturn([]);
    Selector(uut.getSelectedTopicUrls).expect(fullState).toReturn(fullState.topics.selectedTopicUrls);
  });

  it('should get selected topics by URL', () => {
    Selector(uut.getSelectedTopicsByUrl).expect(emptyState).toReturn({});
    Selector(uut.getSelectedTopicsByUrl).expect(fullState).toReturn({
      url1: fullState.topics.topicsByUrl['url1']
    });
    const stateWithTwoSelected = _.cloneDeep(fullState);
    stateWithTwoSelected.topics.selectedTopicUrls = ['url1', 'url2'];
    Selector(uut.getSelectedTopicsByUrl).expect(stateWithTwoSelected).toReturn({
      url1: fullState.topics.topicsByUrl['url1'],
      url2: fullState.topics.topicsByUrl['url2']
    });
  });

  it('should return if topic selection is valid', () => {
    Selector(uut.isTopicSelectionValid).expect(fullState).toReturn(false);
    const stateWithThreeSelected = _.cloneDeep(fullState);
    stateWithThreeSelected.topics.selectedTopicUrls = ['url1', 'url2', 'url3'];
    Selector(uut.isTopicSelectionValid).expect(stateWithThreeSelected).toReturn(true);
  });

  it('should return if topic selection is finalized', () => {
    Selector(uut.isTopicSelectionFinalized).expect(fullState).toReturn(false);
    const finalizedState = {
      topics: {
        selectionFinalized: true
      }
    };
    Selector(uut.isTopicSelectionFinalized).expect(finalizedState).toReturn(true);
  });

});
