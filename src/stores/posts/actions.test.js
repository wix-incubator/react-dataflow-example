describe('posts actions', () => {
  let actions;
  let mockStore;
  let mockTopicsStore;
  let mockReddit;

  beforeEach(() => {
    const lodash = require('lodash');
    lodash.shuffle = lodash.reverse;
    jest.setMock('lodash', lodash);

    jest.mock('./store');
    mockStore = require('./store');

    jest.mock('../topics/store');
    mockTopicsStore = require('../topics/store');

    jest.mock('../../services/reddit');
    mockReddit = require('../../services/reddit');

    actions = require('./actions');
  });

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
});
