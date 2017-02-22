import * as React from 'react';
import { Component } from 'react';
import './App.css';

import { connect } from 'remx/react';

import TopicsScreen from './TopicsScreen';
import PostsScreen from './PostsScreen';

import * as topicsStore from '../stores/topics/store';

class App extends Component<void, void> {
  render() {
    return (
      <div className="App">
        {
          topicsStore.getters.isFinishedTopicsSelection() ?
            < PostsScreen />
            :
            < TopicsScreen />
        }
      </div>
    );
  }
}

export default connect(App);
