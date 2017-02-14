import * as store from './store';

describe('topics store', () => {
  it('initial state loading', () => {
    expect(store.getters.isLoading()).toEqual(true);
  });

  it('holds topics', () => {
    expect(store.getters.getAllTopicsByUrl()).toEqual({});
    const topic1 = { url: 'url1', title: 'title1' };
    const topic2 = { url: 'url2', title: 'title2' };
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
});
