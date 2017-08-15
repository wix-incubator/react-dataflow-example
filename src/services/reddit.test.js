describe('reddit service', () => {
  let reddit;
  let mockHttp;

  beforeEach(() => {
    jest.mock('./http');
    mockHttp = require('./http');
    mockHttp.get = jest.fn();
    reddit = require('./reddit');
  });

  describe('getDefaultSubreddits', () => {
    it('returns array of topics from reddit', async () => {
      const child1 = { data: { subscribers: 10, display_name: 'name1', public_description: 'desc1', url: 'url1' } };
      const child2 = { data: { subscribers: 20, display_name: 'name2', public_description: 'desc2', url: 'url2' } };

      const data = { data: { children: [child1, child2] } };
      mockHttp.get.mockReturnValue(Promise.resolve(data));

      const result = await reddit.getDefaultSubreddits();

      const topic1 = { url: 'url1', title: 'name1', description: 'desc1', subscribers: 10 };
      const topic2 = { url: 'url2', title: 'name2', description: 'desc2', subscribers: 20 };

      expect(result).toEqual([topic1, topic2]);
    });

    it('validates has children', async () => {
      mockHttp.get.mockReturnValue(Promise.resolve([]));
      try {
        await reddit.getDefaultSubreddits();
        fail();
      } catch (e) {
        expect(e).toEqual(new Error('RedditService getDefaultSubreddits failed, children not returned'));
      }
    });
  });

  describe('getPostsFromSubreddit', () => {
    it('returns array of posts from reddit', async () => {
      const rawPost1 = { data: { selftext: 'body1', id: 'id1', title: 'title1', thumbnail: 'http://thumb1', url: 'http://url1' } };
      const rawPost2 = { data: { selftext: 'body2', id: 'id2', title: 'title2', thumbnail: 'http://thumb2', url: 'http://url2' } };

      const data = { data: { children: [rawPost1, rawPost2] } };
      mockHttp.get.mockReturnValue(Promise.resolve(data));

      const result = await reddit.getPostsFromSubreddit('theSubredditUrl');

      const post1 = { id: 'id1', title: 'title1', topicUrl: 'theSubredditUrl', body: 'body1', thumbnail: 'http://thumb1' };
      const post2 = { id: 'id2', title: 'title2', topicUrl: 'theSubredditUrl', body: 'body2', thumbnail: 'http://thumb2' };
      expect(result).toEqual([post1, post2]);
    });

    it('validates url for thumbnail', async () => {
      const rawPost1 = { data: { selftext: 'body1', id: 'id1', title: 'title1', thumbnail: 'thumb1', url: 'http://url1' } };

      const data = { data: { children: [rawPost1] } };
      mockHttp.get.mockReturnValue(Promise.resolve(data));

      const result = await reddit.getPostsFromSubreddit('theSubredditUrl');

      const post1 = { id: 'id1', title: 'title1', topicUrl: 'theSubredditUrl', thumbnail: undefined, body: 'body1' };
      expect(result).toEqual([post1]);
    });

    it('inserts url and validates when has no body', async () => {
      const rawPost1 = { data: { id: 'id1', title: 'title1', thumbnail: 'thumb1', url: 'http://url1' } };
      const data = { data: { children: [rawPost1] } };
      mockHttp.get.mockReturnValue(Promise.resolve(data));

      const result = await reddit.getPostsFromSubreddit('theSubredditUrl');

      const post1 = { id: 'id1', title: 'title1', topicUrl: 'theSubredditUrl', url: 'http://url1' };
      expect(result).toEqual([post1]);
    });

    it('validates has children', async () => {
      try {
        await reddit.getPostsFromSubreddit('theSubredditUrl');
        fail();
      } catch (e) {
        expect(e).toEqual(new Error('RedditService getPostsFromSubreddit failed, children not returned'));
      }
    });
  });
});
