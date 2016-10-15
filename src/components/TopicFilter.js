import _ from 'lodash';
import React, { Component } from 'react';

export default class TopicFilter extends Component {

  render() {
    return (
      <div className={this.props.className}>
        {this.renderFilter('all', 'All')}
        {_.map(this.props.topics, (topic, topicId) => this.renderFilter(topicId, topic.title))}
      </div>
    );
  }

  renderFilter(id, label) {
    const className = this.props.selected === id ? 'selected' : undefined;
    return (
      <a
        key={id}
        href="#"
        className={className}
        onClick={() => this.onFilterClick(id)}>
        {label}
      </a>
    );
  }

  onFilterClick(id) {
    if (id === this.props.selected) return;
    this.props.onChanged(id);
  }

}
