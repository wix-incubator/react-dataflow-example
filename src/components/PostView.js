// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';

export default class PostView extends Component {

  render() {
    if (!this.props.post) return this.renderEmpty();
    if (this.props.post.body) return this.renderBody();
    else if (this._isImage(this.props.post.url)) return this.renderImage();
    else return this.renderUrl();
  }

  renderEmpty() {
    return (
      <div>
        <h3>Select a post to view</h3>
      </div>
    );
  }

  renderBody() {
    return (
      <div>
        {this.props.post.body}
      </div>
    );
  }

  renderImage() {
    return (
      <img src={this.props.post.url} alt={this.props.post.title} />
    );
  }

  renderUrl() {
    return (
      <div>
        <h3>External Link</h3>
        <a href={this.props.post.url} target="_blank">Open</a>
      </div>
    );
  }

  _isImage(url) {
    if (!url) return false;
    return (url.endsWith('.jpg') || url.endsWith('.gif') || url.endsWith('.png'));
  }

}
