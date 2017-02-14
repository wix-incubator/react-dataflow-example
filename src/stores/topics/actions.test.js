describe('topics actions', () => {
  let actions;
  let mockRedditService, mockStore;

  beforeEach(() => {
    jest.mock('../../services/reddit');
    mockRedditService = require('../../services/reddit');
    jest.mock('./store');
    mockStore = require('./store');

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
});