import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostsScreen.css';

class PostsScreen extends Component {

  render() {
    return (
      <h2>Done</h2>
    );
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(PostsScreen);
