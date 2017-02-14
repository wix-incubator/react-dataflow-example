// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './TopicsScreen.css';

import * as topicsStore from '../stores/topics/store';

class TopicsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    if (topicsStore.getters.isLoading) return this.renderLoading();

    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }
}

export default TopicsScreen;
