// components are "dumb" react components that are not aware of anything but themselves
// they receive data from their parents through regular react props
// any local component state and logic should be handled by presenters

import _ from 'lodash';
import React, { Component } from 'react';

import { Topic } from '../stores/Topic';

interface Props {
  className: string;
  topics: Topic[];
  selected: boolean;
  onChanged?: (id: string) => void;
}

export default class TopicFilter extends Component<Props, void> {

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
        onClick={() => this.onFilterClick(id)}
      >
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
