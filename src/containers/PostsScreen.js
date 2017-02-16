// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './PostsScreen.css';

import { connect } from 'remx/react';

import ListRow from '../components/ListRow';
import ListView from '../components/ListView';
import PostView from '../components/PostView';

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

    const postsById = postsStore.getters.getPostsById();
    const postsIdArray = postsStore.getters.getPostsIdsArray();
    const selectedPost = undefined;

    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <ListView
            rowsIdArray={postsIdArray}
            rowsById={postsById}
            renderRow={this.renderRow}
          />
        </div>
        <div className="ContentPane">
          <PostView post={selectedPost} />
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(postId, post) {
    const selected = false;

    return (
      <ListRow
        rowId={postId}
        onClick={this.onRowClick}
        selected={selected}>
        {!post.thumbnail ? false :
          <img className="thumbnail" src={post.thumbnail} alt="thumbnail" />
        }
        <h3>{post.title}</h3>
      </ListRow>
    );
  }

  onRowClick(rowId) {

  }
}

export default connect(PostsScreen);
