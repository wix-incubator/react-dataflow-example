// components are "dumb" react components that are not aware of anything but themselves
// they receive data from their parents through regular react props
// any local component state and logic should be handled by presenters

import * as React from 'react';
import * as autobind from 'react-autobind';

interface Props {
  selected: boolean;
  rowId: string;
  onClick?: (rowId: string) => void;
}

export default class ListRow extends React.Component<Props, null> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  render() {
    const backgroundColor = this.props.selected ? '#c0f0ff' : '#fff';
    return (
      <div
        style={{ backgroundColor }}
        onClick={this.onClick}
      >
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
