// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

class RedditService {
  async getDefaultSubreddits() {
    // not implemented yet
    return [];
  }
}

export default new RedditService();
