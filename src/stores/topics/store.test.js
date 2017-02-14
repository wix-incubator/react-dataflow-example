describe('topics store', () => {
  let store;
  const topic1 = { url: 'url1', title: 'title1' };
  const topic2 = { url: 'url2', title: 'title2' };

  beforeEach(() => {
    store = require('./store');
  });

  it('initial state loading', () => {
    expect(store.getters.isLoading()).toEqual(true);
  });

  it('holds topics', () => {
    expect(store.getters.getAllTopicsByUrl()).toEqual({});
    store.setters.setTopics([topic1, topic2]);
    expect(store.getters.getAllTopicsByUrl()).toEqual({
      'url1': topic1,
      'url2': topic2
    });
  });

  it('stops loading when setTopics called', () => {
    store.setters.setTopics([]);
    expect(store.getters.isLoading()).toEqual(false);
  });

  it('get topic urls array', () => {
    expect(store.getters.getAllTopicsUrls()).toEqual([]);
    store.setters.setTopics([topic1, topic2]);
    expect(store.getters.getAllTopicsUrls()).toEqual(['url1', 'url2']);
  });

  it('holds topics selections', () => {
    store.setters.toggleTopic('myTopicUrl');
    expect(store.getters.isTopicSelected('someTopicUrl')).toBe(false);
    expect(store.getters.isTopicSelected('myTopicUrl')).toBe(true);
  });

  it('topic selection toggle', () => {
    expect(store.getters.isTopicSelected('myTopicUrl')).toBe(false);
    store.setters.toggleTopic('myTopicUrl');
    expect(store.getters.isTopicSelected('myTopicUrl')).toBe(true);
    store.setters.toggleTopic('myTopicUrl2');
    expect(store.getters.isTopicSelected('myTopicUrl2')).toBe(true);
    store.setters.toggleTopic('myTopicUrl');
    expect(store.getters.isTopicSelected('myTopicUrl')).toBe(false);
    expect(store.getters.isTopicSelected('myTopicUrl2')).toBe(true);
  });

  it('holds max of 3 selected topics', () => {
    store.setters.toggleTopic('topic1');
    store.setters.toggleTopic('topic2');
    store.setters.toggleTopic('topic3');
    expect(store.getters.getSelectedTopicUrls()).toEqual(['topic1', 'topic2', 'topic3']);
    store.setters.toggleTopic('topic4');
    expect(store.getters.getSelectedTopicUrls()).toEqual(['topic2', 'topic3', 'topic4']);
  });

  it('topic selection finished when 3 selected', () => {
    expect(store.getters.canFinishTopicsSelection()).toBe(false);
    store.setters.toggleTopic('topic1');
    expect(store.getters.canFinishTopicsSelection()).toBe(false);
    store.setters.toggleTopic('topic2');
    store.setters.toggleTopic('topic3');
    expect(store.getters.canFinishTopicsSelection()).toBe(true);
  });

  it('holds wether finished with topics selection', () => {
    expect(store.getters.isFinishedTopicsSelection()).toBe(false);
    store.setters.finishTopicsSelection();
    expect(store.getters.isFinishedTopicsSelection()).toBe(true);
  });
});
