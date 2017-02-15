describe('posts store', () => {
  let store;

  beforeEach(() => {
    store = require('./store');
  });

  it('initial is loading', () => {
    expect(store.getters.isLoading()).toBe(true);
  });

  it('holds posts by id', () => {
    expect(store.getters.getPostsById()).toEqual({});
    const post1 = { id: 'id1' };
    const post2 = { id: 'id2' };
    store.setters.setPosts([post1, post2]);
    expect(store.getters.getPostsById()).toEqual({ id1: post1, id2: post2 });
  });
});
