// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import './PostsScreen.css';

import _ from 'lodash';

import { connect } from 'remx/react';

import ListRow from '../components/ListRow';
import ListView from '../components/ListView';
import PostView from '../components/PostView';
import TopicFilter from '../components/TopicFilter';

import * as postsStore from '../stores/posts/store';
import * as postsActions from '../stores/posts/actions';
import * as topicsStore from '../stores/topics/store';

class PostsScreen extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  componentDidMount() {
    postsActions.fetchPosts();
  }

  render() {
    if (this.props.isLoading) return this.renderLoading();

    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <TopicFilter
            className="TopicFilter"
            topics={this.props.topicsByUrl}
            selected={this.props.currentFilter}
            onChanged={this.onFilterChanged}
          />
          <ListView
            rowsIdArray={this.props.postsIdArray}
            rowsById={this.props.postsById}
            renderRow={this.renderRow}
          />
        </div>
        <div className="ContentPane">
          <PostView post={this.props.selectedPost} />
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
    const selected = this.props.selectedPostId == postId;

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
    postsActions.selectPost(rowId);
  }

  onFilterChanged(newFilter) {
    postsActions.setFilter(newFilter);
  }
}


function mapStateToProps(ownProps) {
  return {
    isLoading: postsStore.getters.isLoading(),
    postsById: postsStore.getters.getFilteredPostsById(),
    postsIdArray: postsStore.getters.getFilteredPostsIdsArray(),
    selectedPost: postsStore.getters.getSelectedPost(),
    topicsByUrl: topicsStore.getters.getSelectedTopicsByUrl(),
    currentFilter: postsStore.getters.getCurrentFilter(),
    selectedPostId: postsStore.getters.getSelectedPostId()
  };
}

export default connect(mapStateToProps)(PostsScreen);
