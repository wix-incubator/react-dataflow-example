// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './PostsScreen.css';

import { connect } from 'remx/react';

class PostsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="PostsScreen">
        <h3>PostsScreen</h3>
      </div>
    );
  }
}

export default connect(PostsScreen);
