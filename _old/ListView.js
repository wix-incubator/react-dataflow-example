// components are "dumb" react components that are not aware of anything but themselves
// they receive data from their parents through regular react props
// any local component state and logic should be handled by presenters

import _ from 'lodash';
import React, {Component} from 'react';
import autoBind from 'react-autobind';

export default class ListView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <ul>
        {_.map(this.props.rowsIdArray, this.renderRowById)}
      </ul>
    );
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.renderRowThroughProps(rowId)}
      </li>
    );
  }

  renderRowThroughProps(rowId) {
    if (typeof this.props.renderRow === 'function') {
      return this.props.renderRow(rowId, _.get(this.props.rowsById, rowId));
    }
  }

}
