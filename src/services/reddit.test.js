describe('reddit service', () => {
  let reddit;
  let mockFetch;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockFetch = global.fetch;
    reddit = require('./reddit');
  });

  it('returns array of topics from reddit', async () => {
    const child1 = { data: { subscribers: 10, display_name: 'name1', public_description: 'desc1', url: 'url1' } };
    const child2 = { data: { subscribers: 20, display_name: 'name2', public_description: 'desc2', url: 'url2' } };

    const data = { data: { children: [child1, child2] } };
    mockFetch.mockReturnValue(Promise.resolve({ ok: true, json: () => Promise.resolve(data) }));

    const result = await reddit.getDefaultSubreddits();

    const topic1 = { url: 'url1', title: 'name1', description: 'desc1', subscribers: 10 };
    const topic2 = { url: 'url2', title: 'name2', description: 'desc2', subscribers: 20 };

    expect(result).toEqual([topic1, topic2]);
  });

  it('validates response ok', async () => {
    try {
      await reddit.getDefaultSubreddits();
      fail('expected to throw');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
