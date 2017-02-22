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
import TopicFilter from '../components/TopicFilter';

import { Post } from '../stores/Post';

import * as postsStore from '../stores/posts/store';
import * as postsActions from '../stores/posts/actions';
import * as topicsStore from '../stores/topics/store';

class PostsScreen extends Component<void, void> {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    postsActions.fetchPosts();
  }

  render() {
    if (postsStore.getters.isLoading()) return this.renderLoading();

    const postsById = postsStore.getters.getFilteredPostsById();
    const postsIdArray = postsStore.getters.getFilteredPostsIdsArray();
    const selectedPost = postsStore.getters.getSelectedPost();

    const topicsByUrl = topicsStore.getters.getSelectedTopicsByUrl();
    const currentFilter = postsStore.getters.getCurrentFilter();

    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <TopicFilter
            className="TopicFilter"
            topics={topicsByUrl}
            selected={currentFilter}
            onChanged={this.onFilterChanged}
          />
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

  renderRow(postId: string, post: Post): JSX.Element {
    const selected = postsStore.getters.isPostSelected(postId);

    return (
      <ListRow
        rowId={postId}
        onClick={this.onRowClick}
        selected={selected}
      >
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

export default connect(PostsScreen);
