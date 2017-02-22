describe('environment test', () => {
  it('object rest spread', () => {
    const other = { x: 'y' };
    const foo = { a: 'hello', b: 'world', c: 123, inner: { ...other } };
    const {a, inner, ...z} = foo;
    expect(a).toEqual('hello');
    expect(inner).toEqual({ x: 'y' });
    expect(z).toEqual({ b: 'world', c: 123 });
  });

  it('async await', async () => {
    const result = await Promise.resolve('hello world!');
    expect(result).toEqual('hello world!');
  });
});
