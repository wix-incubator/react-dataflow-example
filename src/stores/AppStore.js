// Our main store. the app store holds all the other stores, and holds all the app-related data.
// The appStore needs to keep references to all of the other stores because we currently 
// don't have a better injection mechanism. 

import { extendObservable, action } from 'mobx';
import PostsStore from './PostsStore';
import TopicsStore from './TopicsStore';

export class AppStore {
  constructor() {

    // we use extedendObservable for initializing all the observable data of the store. 
    // If your project supports decorators, there is a much cleaner syntax to to the same thing:
    // class AppStore() {
    //    @observable isSelectionFinalized = false;
    // }

    extendObservable(this, {
      isSelectionFinalized: false
    });
    this.postsStore = new PostsStore();
    this.topicsStore = new TopicsStore();
  }
  
  //in strict mode, any change of observalbe data should take place inside an action:
  setIsSelectionFinalized = action(isSelectionFinalized => this.isSelectionFinalized = isSelectionFinalized);
}

export const appStoreInstance = new AppStore();