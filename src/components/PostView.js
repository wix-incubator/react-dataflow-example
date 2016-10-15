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
      <div dangerouslySetInnerHTML={this._getBodyMarkup(this.props.post.body)} />
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

  _getBodyMarkup(body) {
    return {
      __html: body.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    }
  }

  _isImage(url) {
    if (!url) return false;
    return (url.endsWith('.jpg') || url.endsWith('.gif') || url.endsWith('.png'));
  }

}
