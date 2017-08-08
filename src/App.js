import React, { Component } from 'react';
import TopicsScreen from './containers/TopicsScreen';
import PostsScreen from './containers/PostsScreen';
import './App.css';
import {inject,observer} from 'mobx-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.appStore.isSelectionFinalized ?
          <PostsScreen/> :
          <TopicsScreen/>
        }
      </div>
    );
  }
}
// the inject function connects the component to the AppStore (provided by the provider), 
// the observer function will make sure that our component will be re-rendered upon any observable change.
// behind the scenes, observer just wraps the component's render function with autorun (read Mobx api)
export default inject('appStore')(observer(App));
