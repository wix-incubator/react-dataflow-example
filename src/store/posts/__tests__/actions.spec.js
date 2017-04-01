import _ from 'lodash';
import { Thunk } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import * as uut from '../actions';
import * as topicsSelectors from '../../topics/reducer';
import redditService from '../../../services/reddit';
jest.mock('../../topics/reducer');
jest.mock('../../../services/reddit');

describe('store/posts/actions', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    _.shuffle = jest.fn();
    _.shuffle.mockImplementation((arr) => arr);
  });

  it('should fetch posts when one selected topic', async () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes']);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: '1' }, { id: '2' }]);
    const dispatches = await Thunk(uut.fetchPosts).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.POSTS_FETCHED, postsById: {
      '1': {id: '1'}, '2': {id: '2'}
    }});
  });

  it('should fetch posts from multiple selected topics', async () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes', 'cats']);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: '1' }, { id: '2' }]);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: '3' }, { id: '4' }]);
    const dispatches = await Thunk(uut.fetchPosts).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.POSTS_FETCHED, postsById: {
      '1': {id: '1'}, '2': {id: '2'}, '3': {id: '3'}, '4': {id: '4'}
    }});
  });

  it('should fetch posts and print to console on error', async () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes', 'cats']);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: '1' }, { id: '2' }]);
    redditService.getPostsFromSubreddit.mockImplementationOnce(() => { throw new Error('oops'); });
    console.error = jest.fn(); // mock the console side effect
    const dispatches = await Thunk(uut.fetchPosts).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error('oops'));
  });

  it('should change filter', () => {
    const action = uut.changeFilter('cats');
    expect(action).toEqual({ type: actionTypes.FILTER_CHANGED, filter: 'cats' });
  });

  it('should select post', () => {
    const action = uut.selectPost('id123');
    expect(action).toEqual({ type: actionTypes.POST_SELECTED, postId: 'id123' });
  });

});
