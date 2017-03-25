import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';
import * as uut from '../reducer';

const state = Immutable({
  posts: {
    postsById: {
      'id1': {
        id: 'id1',
        title: 'post1',
        topicUrl: 'cats',
      },
      'id2': {
        id: 'id2',
        title: 'post2',
        topicUrl: 'funny',
      },
      'id3': {
        id: 'id3',
        title: 'post3',
        topicUrl: 'cats',
      },
    },
    currentFilter: 'all',
    currentPostId: undefined
  }
});

describe('store/posts/selectors', () => {

  it('should get posts', () => {
    const result = [state.posts.postsById, ['id1', 'id2', 'id3']];
    Selector(uut.getPosts).expect(state).toReturn(result);
  });

  it('should get posts, with specific filter', () => {
    const stateClone = _.cloneDeep(state);
    stateClone.posts.currentFilter = 'cats';
    const result = [stateClone.posts.postsById, ['id1', 'id3']];
    Selector(uut.getPosts).expect(stateClone).toReturn(result);
  });

  it('should get current filter', () => {
    Selector(uut.getCurrentFilter).expect(state).toReturn(state.posts.currentFilter);
  });

  it('should get current post', () => {
    Selector(uut.getCurrentPost).expect(state).toReturn(undefined);
    const stateClone = _.cloneDeep(state);
    stateClone.posts.currentPostId = 'id1';
    Selector(uut.getCurrentPost).expect(stateClone).toReturn(stateClone.posts.postsById['id1']);
  });

});
