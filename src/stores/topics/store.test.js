import * as store from './store';

describe('topics store', () => {
  const topic1 = { url: 'url1', title: 'title1' };
  const topic2 = { url: 'url2', title: 'title2' };

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
});
