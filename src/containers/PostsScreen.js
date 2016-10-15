import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostsScreen.css';
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';
import PostView from '../components/PostView';

class PostsScreen extends Component {

  componentDidMount() {
    this.props.dispatch(postsActions.fetchPosts());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <TopicFilter
            className="TopicFilter"
            topics={this.props.topicsByUrl}
            selected={this.props.currentFilter}
            onChanged={this.onFilterChanged.bind(this)}
            />
          <ListView
            rowsIdArray={this.props.rowsIdArray}
            rowsById={this.props.rowsById}
            renderRow={this.renderRow.bind(this)} />
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

  renderRow(rowId, row) {
    const selected = this.props.currentPost === row;
    return (
      <ListRow
        rowId={rowId}
        onClick={this.onRowClick.bind(this)}
        selected={selected}>
        {!row.thumbnail ? false :
          <img className="thumbnail" src={row.thumbnail} alt='thumbnail' />
        }
        <h3>{row.title}</h3>
      </ListRow>
    )
  }

  onFilterChanged(newFilter) {
    this.props.dispatch(postsActions.changeFilter(newFilter));
  }

  onRowClick(rowId) {
    this.props.dispatch(postsActions.selectPost(rowId));
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  const [postsById, postsIdArray] = postsSelectors.getPosts(state);
  return {
    rowsById: postsById,
    rowsIdArray: postsIdArray,
    topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
    currentFilter: postsSelectors.getCurrentFilter(state),
    currentPost: postsSelectors.getCurrentPost(state)
  };
}

export default connect(mapStateToProps)(PostsScreen);
