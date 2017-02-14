// components are "dumb" react components that are not aware of anything but themselves
// they receive data from their parents through regular react props
// any local component state and logic should be handled by presenters

import React, {Component} from 'react';
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
