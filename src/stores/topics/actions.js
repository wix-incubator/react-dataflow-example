import * as redditService from '../../services/reddit';
import * as store from './store';

export async function fetchAllTopics() {
  const topics = await redditService.getDefaultSubreddits();
  store.setters.setTopics(topics);
}

export function selectTopic(topicUrl) {
  store.setters.toggleTopic(topicUrl);
}
