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
    this.props.onClick(this.props.rowId);
  }

}
