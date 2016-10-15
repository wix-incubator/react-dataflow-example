import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostsScreen.css';
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

class PostsScreen extends Component {

  componentDidMount() {
    this.props.dispatch(postsActions.fetchPosts());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="PostsScreen">
        <ListView
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow.bind(this)} />
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(rowId, row) {
    return (
      <ListRow rowId={rowId}>
        {!row.thumbnail ? false :
          <img className="thumbnail" src={row.thumbnail} />
        }
        <h3>{row.title}</h3>
      </ListRow>
    )
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  const [postsById, postsIdArray] = postsSelectors.getPosts(state);
  return {
    rowsById: postsById,
    rowsIdArray: postsIdArray
  };
}

export default connect(mapStateToProps)(PostsScreen);
