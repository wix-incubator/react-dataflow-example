import uut from '../reddit';
global.fetch = require('jest-fetch-mock');

describe('services/reddit', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get default subreddits', async () => {
    const data = require('./reddit.subreddits.json');
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await uut.getDefaultSubreddits();
    expect(response).toEqual([
      { description: "desc", title: "sports", url: "/r/sports/" },
      { description: "desc", title: "gadgets", url: "/r/gadgets/" }
    ]);
  });

  it('should handle default subreddit http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try { await uut.getDefaultSubreddits(); }
    catch (e) { error = e; }
    expect(error).toEqual(new Error('RedditService getDefaultSubreddits failed, HTTP status 500'));
  });

  it('should get posts from subreddit', async () => {
    const data = require('./reddit.posts.json');
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await uut.getPostsFromSubreddit('subreddit');
    expect(response).toEqual([
      { body: "", id: "62z0lo", thumbnail: "http://thumbnail", title: "title", topicUrl: "subreddit", url: "http://url" },
      { body: "body", id: "62zcyy", thumbnail: undefined, title: "title", topicUrl: "subreddit", url: undefined }
    ]);
  });

  it('should handle get posts http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try { await uut.getPostsFromSubreddit('subreddit'); }
    catch (e) { error = e; }
    expect(error).toEqual(new Error('RedditService getPostsFromSubreddit failed, HTTP status 500'));
  });

});
