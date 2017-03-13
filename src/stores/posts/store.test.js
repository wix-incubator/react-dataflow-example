describe('posts store', () => {
  let store;
  const post1 = { id: 'id1', topicUrl: 'topicUrl1' };
  const post2 = { id: 'id2', topicUrl: 'topicUrl2' };
  const post3 = { id: 'id3', topicUrl: 'topicUrl1' };

  beforeEach(() => {
    store = require('./store');
  });

  it('initial is loading', () => {
    expect(store.getters.isLoading()).toBe(true);
  });

  it('holds posts by id', () => {
    expect(store.getters.getFilteredPostsById()).toEqual({});

    store.setters.setPosts([post1, post2]);
    expect(store.getters.getFilteredPostsById()).toEqual({ id1: post1, id2: post2 });
  });

  it('stops loading once setPosts called', () => {
    store.setters.setPosts([]);
    expect(store.getters.isLoading()).toBe(false);
  });

  it('returns posts id array', () => {
    store.setters.setPosts([post1, post2]);
    expect(store.getters.getFilteredPostsIdsArray()).toEqual(['id1', 'id2']);
  });

  it('holds selected postId, finds the post from current posts', () => {
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.selectPost('id1');
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.setPosts([post2]);
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.setPosts([post2, post1]);
    expect(store.getters.getSelectedPost()).toBe(post1);
  });

  it('is post selected', () => {
    expect(store.getters.isPostSelected('')).toBe(false);
    expect(store.getters.isPostSelected('thePostId')).toBe(false);
    store.setters.selectPost('thePostId');
    expect(store.getters.isPostSelected('thePostId')).toBe(true);
  });

  it('initial filter is all', () => {
    expect(store.getters.getCurrentFilter()).toEqual('all');
  });

  it('holds topics filter, default is all', () => {
    store.setters.setFilter('myFilter');
    expect(store.getters.getCurrentFilter()).toEqual('myFilter');
    store.setters.setFilter();
    expect(store.getters.getCurrentFilter()).toEqual('all');
  });

  it('getPosts returns filtered posts', () => {
    store.setters.setPosts([post1, post2, post3]);
    store.setters.setFilter('topicUrl1');
    expect(store.getters.getFilteredPostsById()).toEqual({ id1: post1, id3: post3 });
    expect(store.getters.getFilteredPostsIdsArray()).toEqual(['id1', 'id3']);
  });

  it('isPostMatchesFilter', () => {
    expect(store.getters.isPostMatchesFilter()).toBe(true);
    store.setters.setFilter('someTopicUrl');
    expect(store.getters.isPostMatchesFilter({})).toBe(false);
    expect(store.getters.isPostMatchesFilter({ topicUrl: 'someTopicUrl' })).toBe(true);
    store.setters.setFilter(undefined);
  });

  it('getSelectedPostId', () => {
    expect(store.getters.getSelectedPostId()).toEqual('');
    store.setters.selectPost('thePostId');
    expect(store.getters.getSelectedPostId()).toEqual('thePostId');
  });
});
