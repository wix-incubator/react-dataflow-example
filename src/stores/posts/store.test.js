describe('posts store', () => {
  let store;
  const post1 = { id: 'id1' };
  const post2 = { id: 'id2' };

  beforeEach(() => {
    store = require('./store');
  });

  it('initial is loading', () => {
    expect(store.getters.isLoading()).toBe(true);
  });

  it('holds posts by id', () => {
    expect(store.getters.getPostsById()).toEqual({});

    store.setters.setPosts([post1, post2]);
    expect(store.getters.getPostsById()).toEqual({ id1: post1, id2: post2 });
  });

  it('stops loading once setPosts called', () => {
    store.setters.setPosts([]);
    expect(store.getters.isLoading()).toBe(false);
  });

  it('returns posts id array', () => {
    store.setters.setPosts([post1, post2]);
    expect(store.getters.getPostsIdsArray()).toEqual(['id1', 'id2']);
  });

  it('holds selected post', () => {
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.selectPost(post1);
    expect(store.getters.getSelectedPost()).toBe(post1);
  });
});
