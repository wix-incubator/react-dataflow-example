
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { inject, observer } from 'mobx-react';
import './PostsScreen.css';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';
import PostView from '../components/PostView';

// In our containers, we can just use our data in the stores,
// and Mobx will make sure that the component will re-render on any change of data.
class PostsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    if (this.props.postsStore.postsList.length === 0) {
      return this.renderLoading();
    } else {
      return (
        <div className="PostsScreen">
          <div className="LeftPane">
            <TopicFilter
              className="TopicFilter"
              topics={this.props.topicsStore.selectedTopicsList}
              selected={this.props.postsStore.currentFilter}
              onChanged={this.onFilterChanged}
            />
            <ListView>
              {this.props.postsStore.postsList
                .filter(post => post.topicUrl === this.props.postsStore.currentFilter || this.props.postsStore.currentFilter === 'all' )
                .map((post, index) => this.renderRow(post, index))
              }
            </ListView>
          </div>
          <div className="ContentPane">
            <PostView post={this.props.postsStore.currentPost} />
          </div>
        </div>
      );
    }
  }

  renderRow(post, index) {
    const selected = this.props.postsStore.currentPost === post;
    return (
      <ListRow
        key={index}
        onClick={this.onRowClick}
        item={post}
        selected={selected}>
        {post.thumbnail ? <img className="thumbnail" src={post.thumbnail} alt="thumbnail" /> :
          null
        }
        <h3 data-hook="postTitle">{post.title}</h3>
      </ListRow>
    )
  }

  onFilterChanged(newFilter) {
    this.props.postsStore.setCurrentFilter(newFilter);
  }
  onRowClick(post) {
    this.props.postsStore.setCurrentPost(post);
  }
  renderLoading() {
    return (
      <p data-hook="loader">Loading...</p>
    );
  }
}

export default inject('postsStore', 'topicsStore')(observer(PostsScreen));
