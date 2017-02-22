describe('posts actions', () => {
  let actions;
  let mockStore;
  let mockTopicsStore;
  let mockReddit;

  beforeEach(() => {
    mockLodashShuffle();

    jest.mock('./store');
    mockStore = require('./store');

    jest.mock('../topics/store');
    mockTopicsStore = require('../topics/store');

    jest.mock('../../services/reddit');
    mockReddit = require('../../services/reddit');

    actions = require('./actions');
  });

  /**
   *  The ways we test business logic that relies on random things:
   *  either make it deterministic
   *  (in this case we make shuffle behave like reverse)
   *  or inject a provider that can be mocked
   */
  function mockLodashShuffle() {
    const lodash = require('lodash');
    lodash.shuffle = lodash.reverse;
    jest.setMock('lodash', lodash);
  }

  it('fetch posts using selected topics', async () => {
    mockTopicsStore.getters.getSelectedTopicUrls.mockReturnValue(['topic1', 'topic1']);
    const postA = {};
    const postB = {};
    const postC = {};
    const postD = {};
    mockReddit.getPostsFromSubreddit.mockReturnValueOnce(Promise.resolve([postA, postB]));
    mockReddit.getPostsFromSubreddit.mockReturnValueOnce(Promise.resolve([postC, postD]));

    await actions.fetchPosts();

    expect(mockReddit.getPostsFromSubreddit).toHaveBeenCalledTimes(2);
    expect(mockReddit.getPostsFromSubreddit).toHaveBeenCalledWith('topic1');

    expect(mockStore.setters.setPosts).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setPosts).toHaveBeenCalledWith([postA, postB, postC, postD]);
  });

  it('fetch posts shuffles resulting posts', async () => {
    mockTopicsStore.getters.getSelectedTopicUrls.mockReturnValue(['topic1', 'topic1']);
    const postA = { id: 'A' };
    const postB = { id: 'B' };
    const postC = { id: 'C' };
    const postD = { id: 'D' };
    mockReddit.getPostsFromSubreddit.mockReturnValueOnce(Promise.resolve([postA, postB]));
    mockReddit.getPostsFromSubreddit.mockReturnValueOnce(Promise.resolve([postC, postD]));

    await actions.fetchPosts();

    expect(mockReddit.getPostsFromSubreddit).toHaveBeenCalledTimes(2);
    expect(mockReddit.getPostsFromSubreddit).toHaveBeenCalledWith('topic1');
    expect(mockStore.setters.setPosts).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setPosts).toHaveBeenCalledWith([postD, postC, postB, postA]);
  });

  it('select post saves to store', () => {
    actions.selectPost('theId');

    expect(mockStore.setters.selectPost).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.selectPost).toHaveBeenCalledWith('theId');
  });

  it('fetchPosts handles no selected topics', async () => {
    expect(mockTopicsStore.getters.getSelectedTopicUrls()).toEqual(undefined);
    await actions.fetchPosts();
    expect(mockStore.setters.setPosts).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setPosts).toHaveBeenCalledWith([]);
  });

  it('setFilter delegates to store', () => {
    actions.setFilter('myfilter');
    expect(mockStore.setters.setFilter).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setFilter).toHaveBeenCalledWith('myfilter');
  });
});
