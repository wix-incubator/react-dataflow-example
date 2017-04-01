import { Thunk } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import * as uut from '../actions';
import * as topicsSelectors from '../reducer';
import redditService from '../../../services/reddit';
jest.mock('../reducer');
jest.mock('../../../services/reddit');

describe('store/topics/actions', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch topics from server', async () => {
    redditService.getDefaultSubreddits.mockReturnValueOnce([{ title: '1', url: 'url1' }, { title: '2', url: 'url2' }]);
    const dispatches = await Thunk(uut.fetchTopics).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.TOPICS_FETCHED, topicsByUrl: {
      url1: { title: '1', url: 'url1' },
      url2: { title: '2', url: 'url2' }
    }});
  });

  it('should fetch topics and print to console on error', async () => {
    redditService.getDefaultSubreddits.mockImplementationOnce(() => { throw new Error('oops'); });
    console.error = jest.fn(); // mock the console side effect
    const dispatches = await Thunk(uut.fetchTopics).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error('oops'));
  });

  it('should select a new topic', () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes']);
    const dispatches = Thunk(uut.selectTopic).execute('cats');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.TOPICS_SELECTED, selectedTopicUrls: ['jokes', 'cats'] });
  });

  it('should delete selected topic when selected again', () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes', 'cats']);
    const dispatches = Thunk(uut.selectTopic).execute('jokes');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.TOPICS_SELECTED, selectedTopicUrls: ['cats'] });
  });

  it('should select three topics and prefetch posts', () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes', 'cats']);
    const dispatches = Thunk(uut.selectTopic).execute('pics');
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.TOPICS_SELECTED, selectedTopicUrls: ['jokes', 'cats', 'pics'] });
    expect(dispatches[1].isFunction()).toBe(true);
    expect(dispatches[1].getName()).toEqual('fetchPosts');
  });

  it('should not select more than three topics', () => {
    topicsSelectors.getSelectedTopicUrls.mockReturnValueOnce(['jokes', 'cats', 'pics']);
    const dispatches = Thunk(uut.selectTopic).execute('news');
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({ type: actionTypes.TOPICS_SELECTED, selectedTopicUrls: ['cats', 'pics', 'news'] });
    expect(dispatches[1].isFunction()).toBe(true);
    expect(dispatches[1].getName()).toEqual('fetchPosts');
  });

  it('should finalize topic selection', () => {
    const action = uut.finalizeTopicSelection();
    expect(action).toEqual({ type: actionTypes.TOPIC_SELECTION_FINALIZED });
  });

});
