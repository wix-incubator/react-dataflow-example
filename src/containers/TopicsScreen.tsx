// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, { Component } from 'react';
import autobind from 'react-autobind';
import './TopicsScreen.css';

import { connect } from 'remx/react';

import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

const ConnectedListView = connect(ListView);

import * as topicsStore from '../stores/topics/store';
import * as topicsActions from '../stores/topics/actions';

class TopicsScreen extends Component<void, void> {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    topicsActions.fetchAllTopics();
  }

  render() {
    if (topicsStore.getters.isLoading()) return this.renderLoading();

    const topicsByUrl = topicsStore.getters.getAllTopicsByUrl();
    const topicUrlsArray = topicsStore.getters.getAllTopicsUrls();

    const canFinalizeSelection = topicsStore.getters.canFinishTopicsSelection();

    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ConnectedListView
          rowsIdArray={topicUrlsArray}
          rowsById={topicsByUrl}
          renderRow={this.renderRow}
        />
        {!canFinalizeSelection ? false :
          <button className="NextScreen" onClick={this.onNextScreenClick} />
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(topicUrl, topic) {
    const isSelected = topicsStore.getters.isTopicSelected(topicUrl);

    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.onRowClick}
        selected={isSelected}
      >
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    );
  }

  onRowClick(topicUrl) {
    topicsActions.toggleTopicSelection(topicUrl);
  }

  onNextScreenClick() {
    topicsActions.finishTopicsSelection();
  }
}

export default connect(TopicsScreen);
