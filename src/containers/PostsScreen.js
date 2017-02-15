// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './PostsScreen.css';

import { connect } from 'remx/react';

import * as postsStore from '../stores/posts/store';
import * as postsActions from '../stores/posts/actions';

class PostsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    postsActions.fetchPosts();
  }

  render() {
    if (postsStore.getters.isLoading()) return this.renderLoading();

    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          heeeey
        </div>
        <div className="ContentPane">
        </div>
      </div>
    );
  }


  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }
}

export default connect(PostsScreen);
