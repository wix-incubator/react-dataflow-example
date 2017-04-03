import _ from 'lodash';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';

import * as reducers from '../reducers';
import * as uut from '../posts/actions';
import * as topicsActions from '../topics/actions';
import * as postsSelectors from '../posts/reducer';
import redditService from '../../services/reddit';
jest.mock('../../services/reddit');

describe('store/posts integration', () => {

  let flushThunks, store;

  beforeEach(() => {
    jest.resetAllMocks();
    _.shuffle = jest.fn();
    _.shuffle.mockImplementation((arr) => arr);
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers(reducers), applyMiddleware(flushThunks, thunk));
  });

  it('should fetch posts and filter', async () => {
    redditService.getDefaultSubreddits.mockReturnValueOnce([
      { title: "gadgets", url: "/r/gadgets/" },
      { title: "pics", url: "/r/pics/" }
    ]);
    await store.dispatch(topicsActions.fetchTopics());

    store.dispatch(topicsActions.selectTopic("/r/gadgets/"));
    store.dispatch(topicsActions.selectTopic("/r/pics/"));

    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "1", topicUrl: "/r/gadgets/" }, { id: "2", topicUrl: "/r/gadgets/" }]);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "3", topicUrl: "/r/pics/" }]);
    await store.dispatch(uut.fetchPosts());
    expect(postsSelectors.getPosts(store.getState())).toEqual([
      {
        "1": {"id": "1", "topicUrl": "/r/gadgets/"},
        "2": {"id": "2", "topicUrl": "/r/gadgets/"},
        "3": {"id": "3", "topicUrl": "/r/pics/"}
      },
      ["1", "2", "3"]
    ]);

    store.dispatch(uut.changeFilter("/r/pics/"));
    expect(postsSelectors.getPosts(store.getState())).toEqual([
      {
        "1": {"id": "1", "topicUrl": "/r/gadgets/"},
        "2": {"id": "2", "topicUrl": "/r/gadgets/"},
        "3": {"id": "3", "topicUrl": "/r/pics/"}
      },
      ["3"]
    ]);
  });

  it('should select post', async () => {
    store.dispatch(topicsActions.selectTopic("/r/gadgets/"));
    store.dispatch(topicsActions.selectTopic("/r/pics/"));

    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "1", topicUrl: "/r/gadgets/" }, { id: "2", topicUrl: "/r/gadgets/" }]);
    redditService.getPostsFromSubreddit.mockReturnValueOnce([{ id: "3", topicUrl: "/r/pics/" }]);
    await store.dispatch(uut.fetchPosts());
    expect(postsSelectors.getCurrentPost(store.getState())).toEqual(undefined);

    store.dispatch(uut.selectPost("2"));
    expect(postsSelectors.getCurrentPost(store.getState())).toEqual({"id": "2", "topicUrl": "/r/gadgets/"});
  });

});
