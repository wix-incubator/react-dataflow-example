// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import _ from 'lodash';
import React, { Component } from 'react';

export default class TopicFilter extends Component {

  render() {
    return (
      <div className={this.props.className}>
        {this.renderFilter('all', 'All')}
        {this.props.topics.map((topic) => this.renderFilter(topic.url,topic.title))}
      </div>
    );
  }

  renderFilter(url, label) {
    const className = this.props.selected === url ? 'selected' : undefined;
    return (
      <a 
        data-hook="filter"
        key={url}
        href="#"
        className={className}
        onClick={() => this.onFilterClick(url)}>
        {label}
      </a>
    );
  }

  onFilterClick(id) {
    if (id === this.props.selected) return;
    if (typeof this.props.onChanged === 'function') {
      this.props.onChanged(id);
    }
  }

}
