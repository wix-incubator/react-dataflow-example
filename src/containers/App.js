import React, { Component } from 'react';
import './App.css';

import { connect } from 'remx/react';

import TopicsScreen from './TopicsScreen';
import PostsScreen from './PostsScreen';

import * as topicsStore from '../stores/topics/store';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.isFinishedTopicsSelection ?
            < PostsScreen />
            :
            < TopicsScreen />
        }
      </div>
    );
  }
}

function mapStateToProps(ownProps) {
  return {
    isFinishedTopicsSelection: topicsStore.getters.isFinishedTopicsSelection()
  };
}

export default connect(mapStateToProps)(App);
