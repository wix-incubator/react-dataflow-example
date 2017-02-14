import * as store from './store';

describe('topics store', () => {
  it('initial state loading', () => {
    expect(store.getters.isLoading()).toEqual(true);
  });
});
