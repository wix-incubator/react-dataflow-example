import _ from 'lodash';
import React, { Component } from 'react';

export default class ListView extends Component {

  render() {
    return (
      <ul>
        {_.map(this.props.rowsIdArray, this.renderRowById.bind(this))}
      </ul>
    );
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.props.renderRow(_.get(this.props.rowsById, rowId))}
      </li>
    );
  }

}
