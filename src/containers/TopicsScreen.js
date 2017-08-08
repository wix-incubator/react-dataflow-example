import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { inject, observer } from 'mobx-react';
import ListRow from '../components/ListRow';
import ListView from '../components/ListView';
import './TopicsScreen.css';

// In our containers, we can just use our data in the stores,
// and Mobx will make sure that the component will re-render on any change of data.
class TopicsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.topicsStore.fetchTopics();
  }

  render() {
    if (this.props.topicsStore.topicsList.length === 0) {
      return this.renderLoading()
    } else {
      return (
        <div className="TopicsScreen">
          <h3>Choose 3 topics of interest</h3>
          <ListView>
            {this.props.topicsStore.topicsList.map((topic, index) => this.renderRow(topic, index))}
          </ListView>
          {this.props.topicsStore.canFinalizeSelection() ? <button data-hook="nextButton" className="NextScreen" onClick={this.onNextScreenClick} /> : null}
        </div>
      );
    }
  }

  renderRow(topic, index) {
    const isSelected = this.props.topicsStore.isTopicSelected(topic);
    return (
      <ListRow
        key={index}
        item={topic}
        onClick={this.onRowClick}
        selected={isSelected}>
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    )
  }

  renderLoading() {
    return (
      <p data-hook="loader">Loading...</p>
    );
  }

  onRowClick(topic) {
    this.props.topicsStore.selectTopic(topic);
  }

  onNextScreenClick() {
    this.props.appStore.setIsSelectionFinalized(true);
  }
}

export default inject('appStore','topicsStore')(observer(TopicsScreen));
