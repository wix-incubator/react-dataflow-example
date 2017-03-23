import _ from 'lodash';
import Immutable from 'seamless-immutable';
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
    const [postsById, postsIdArray] = uut.getPosts(state);
    expect(postsById).toBe(state.posts.postsById);
    expect(postsIdArray).toEqual(['id1', 'id2', 'id3']);
  });

  it('should get posts, with specific filter', () => {
    const stateClone = _.cloneDeep(state);
    stateClone.posts.currentFilter = 'cats';
    const [postsById, postsIdArray] = uut.getPosts(stateClone);
    expect(postsById).toBe(stateClone.posts.postsById);
    expect(postsIdArray).toEqual(['id1', 'id3']);
  });

  it('should get current filter', () => {
    expect(uut.getCurrentFilter(state)).toBe(state.posts.currentFilter);
  });
  
  it('should get current post', () => {
    expect(uut.getCurrentPost(state)).toBe(undefined);
    const stateClone = _.cloneDeep(state);
    stateClone.posts.currentPostId = 'id1';
    expect(uut.getCurrentPost(stateClone)).toBe(stateClone.posts.postsById['id1']);
  });

});
