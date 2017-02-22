describe('http', () => {
  let http;
  let mockFetch;

  beforeEach(() => {
    fetch = jest.fn();
    mockFetch = fetch;

    http = require('./http');
  });

  it('validates response ok', async () => {
    mockFetch.mockReturnValue(Promise.resolve({ ok: false, status: 'TheStatusCode' }));
    try {
      await http.get('TheUrl');
      fail('expected to throw');
    } catch (e) {
      expect(e).toEqual(new Error('failed for TheUrl, status TheStatusCode'));
    }
  });

  it('returns json response', async () => {
    mockFetch.mockReturnValue(Promise.resolve({ ok: true, json: () => Promise.resolve('hello world!') }));
    const result = await http.get();
    expect(result).toEqual('hello world!');
  });
});
