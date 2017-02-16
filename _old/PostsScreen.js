// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'remx/react';
import './PostsScreen.css';

import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';
import PostView from '../components/PostView';

//import * as postsActions from '../store/posts/actions';
//import * as postsSelectors from '../store/posts/reducer';
//import * as topicsSelectors from '../store/topics/reducer';

class PostsScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(postsActions.fetchPosts());
  }

  render() {
    if (!this.props.postsById) return this.renderLoading();
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
            renderRow={this.renderRow} />
        </div>
        <div className="ContentPane">
          <PostView post={this.props.currentPost} />
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
    const selected = this.props.currentPost === post;
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
    )
  }

  onFilterChanged(newFilter) {
    this.props.dispatch(postsActions.changeFilter(newFilter));
  }

  onRowClick(postId) {
    this.props.dispatch(postsActions.selectPost(postId));
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
//function mapStateToProps(state) {
//  const [postsById, postsIdArray] = postsSelectors.getPosts(state);
//  return {
//    postsById,
//    postsIdArray,
//    topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
//    currentFilter: postsSelectors.getCurrentFilter(state),
//    currentPost: postsSelectors.getCurrentPost(state)
//  };
//}

export default connect(PostsScreen);
