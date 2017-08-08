import { extendObservable, action } from 'mobx';
import redditService from '../services/reddit';
import autoBind from 'react-autobind';
import { appStoreInstance } from '../stores/AppStore';

export default class TopicsStore {
  constructor() {
    autoBind(this);
    extendObservable(this, {
      topicsList: [],
      selectedTopicsList: []
    });
  }
  
  setTopicsList = action(topicsList => this.topicsList.replace(topicsList));

  async fetchTopics() {
    try {
      const subredditArray = await redditService.getDefaultSubreddits();
      this.setTopicsList(subredditArray);
    } catch (error) {
      console.error(error);
    }
  }

  selectTopic = action(topic => {
    this.selectedTopicsList.push(topic);
    if (this.selectedTopicsList.length === 4) {
      this.selectedTopicsList.shift();
    }
    if (this.selectedTopicsList.length === 3) {
      appStoreInstance.postsStore.fetchPosts(this.selectedTopicsList);
    }
  });

  isTopicSelected(topic) {
    return !!this.selectedTopicsList.find(selectedTopic => selectedTopic.url === topic.url);
  }

  canFinalizeSelection() {
    return this.selectedTopicsList.length === 3;
  }
}
