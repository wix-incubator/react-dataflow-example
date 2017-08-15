describe('topics actions', () => {
  let actions;
  let mockRedditService, mockStore, mockPostsActions;

  beforeEach(() => {
    jest.mock('../../services/reddit');
    mockRedditService = require('../../services/reddit');
    mockRedditService.getDefaultSubreddits = jest.fn();
    jest.mock('./store');
    mockStore = require('./store');
    mockStore.setters.toggleTopic = jest.fn();
    mockPostsActions = require('../posts/actions');
    mockPostsActions.fetchPosts = jest.fn();

    actions = require('./actions');
  });

  it('fetch all topics loads all topics from reddit into store', async () => {
    const topic1 = {};
    const topic2 = {};
    mockRedditService.getDefaultSubreddits.mockReturnValue(Promise.resolve([topic1, topic2]));

    await actions.fetchAllTopics();

    expect(mockRedditService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setTopics).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setTopics).toHaveBeenCalledWith([topic1, topic2]);
  });

  it('select topic', () => {
    actions.toggleTopicSelection('theTopicUrl');
    expect(mockStore.setters.toggleTopic).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.toggleTopic).toHaveBeenCalledWith('theTopicUrl');
  });

  it('finish topic selection', () => {
    actions.finishTopicsSelection();
    expect(mockStore.setters.finishTopicsSelection).toHaveBeenCalledTimes(1);
  });

  it('fetchTopics sorts by subscribers, descending', async () => {
    const topic1 = { subscribers: 10 };
    const topic2 = { subscribers: 20 };
    const topic3 = { subscribers: 15 };
    mockRedditService.getDefaultSubreddits.mockReturnValue(Promise.resolve([topic1, topic2, topic3]));

    await actions.fetchAllTopics();

    expect(mockStore.setters.setTopics).toHaveBeenCalledTimes(1);
    expect(mockStore.setters.setTopics).toHaveBeenCalledWith([topic2, topic3, topic1]);
  });

  it('toggleTopicSelection will prefetch the posts for this topic', async () => {
    await actions.toggleTopicSelection('topic1');
    expect(mockPostsActions.fetchPosts).toHaveBeenCalledTimes(1);
  });
});
