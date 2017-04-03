import _ from 'lodash';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';

import * as reducers from '../reducers';
import * as uut from '../topics/actions';
import * as topicsSelectors from '../topics/reducer';
import * as postsSelectors from '../posts/reducer';
import redditService from '../../services/reddit';
jest.mock('../../services/reddit');

describe('store/topics integration', () => {

  let flushThunks, store;

  beforeEach(() => {
    jest.resetAllMocks();
    _.shuffle = jest.fn();
    _.shuffle.mockImplementation((arr) => arr);
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers(reducers), applyMiddleware(flushThunks, thunk));
  });

  it('should fetch topics', async () => {
    redditService.getDefaultSubreddits.mockReturnValueOnce([
      { title: "sports", url: "/r/sports/" },
      { title: "gadgets", url: "/r/gadgets/" }
    ]);
    expect(topicsSelectors.getTopics(store.getState())).toEqual([undefined, []]);
    await store.dispatch(uut.fetchTopics());
    expect(topicsSelectors.getTopics(store.getState())).toEqual([
      {
        "/r/gadgets/": { "title": "gadgets", "url": "/r/gadgets/" },
        "/r/sports/": { "title": "sports", "url": "/r/sports/" }
      },
      ["/r/sports/", "/r/gadgets/"]
    ]);
  });

  it('should select topics one by one until valid', async () => {
    redditService.getDefaultSubreddits.mockReturnValueOnce([
      { title: "sports", url: "/r/sports/" },
      { title: "gadgets", url: "/r/gadgets/" },
      { title: "pics", url: "/r/pics/" },
      { title: "news", url: "/r/news/" }
    ]);
    await store.dispatch(uut.fetchTopics());
    expect(topicsSelectors.getSelectedTopicUrls(store.getState())).toEqual([]);
    expect(topicsSelectors.isTopicSelectionValid(store.getState())).toBe(false);

    store.dispatch(uut.selectTopic("/r/gadgets/"));
    store.dispatch(uut.selectTopic("/r/pics/"));
    expect(topicsSelectors.getSelectedTopicUrls(store.getState())).toEqual(["/r/gadgets/", "/r/pics/"]);
    expect(topicsSelectors.isTopicSelectionValid(store.getState())).toBe(false);
    expect(postsSelectors.getPosts(store.getState())).toEqual([undefined, []]);

    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "1", topicUrl: "/r/gadgets/" }, { id: "2", topicUrl: "/r/gadgets/" }]);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "3", topicUrl: "/r/pics/" }]);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "4", topicUrl: "/r/sports/" }]);
    store.dispatch(uut.selectTopic("/r/sports/"));
    await flushThunks.flush();
    expect(topicsSelectors.getSelectedTopicUrls(store.getState())).toEqual(["/r/gadgets/", "/r/pics/", "/r/sports/"]);
    expect(topicsSelectors.isTopicSelectionValid(store.getState())).toBe(true);
    expect(postsSelectors.getPosts(store.getState())).toEqual([
      {
        "1": {"id": "1", "topicUrl": "/r/gadgets/"},
        "2": {"id": "2", "topicUrl": "/r/gadgets/"},
        "3": {"id": "3", "topicUrl": "/r/pics/"},
        "4": {"id": "4", "topicUrl": "/r/sports/"}
      },
      ["1", "2", "3", "4"]
    ]);
  });

  it('should finalize topic selection', () => {
    expect(topicsSelectors.isTopicSelectionFinalized(store.getState())).toBe(false);
    store.dispatch(uut.finalizeTopicSelection());
    expect(topicsSelectors.isTopicSelectionFinalized(store.getState())).toBe(true);
  });

});
