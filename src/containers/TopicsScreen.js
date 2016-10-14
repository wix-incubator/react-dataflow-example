import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TopicsScreen.css';
import * as topicsActions from '../store/topics/actions';

class TopicsScreen extends Component {
  componentDidMount() {
    this.props.dispatch(topicsActions.fetchTopics());
  }
  render() {
    return (
      <h2>Where are my topics?</h2>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(TopicsScreen);
