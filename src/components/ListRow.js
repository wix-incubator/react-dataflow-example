// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class ListRow extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const backgroundColor = this.props.selected ? '#c0f0ff' : '#fff';
    return (
      <div
        style={{ backgroundColor }}
        onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }

  onClick() {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.rowId);
    }
  }

}
