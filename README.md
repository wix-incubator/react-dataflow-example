# React Dataflow Example

A real-life example of a React project with focus on dataflow management. The example explores and compares methodologies by implementing the same app in different branches:

  * [redux-thunk branch](https://github.com/wix/react-dataflow-example/tree/redux-thunk/src) - Basic Redux (thunks)<br>Walkthrough post: [Redux Step by Step: A Simple and Robust Workflow for Real Life Apps](https://medium.com/@talkol/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092#.bgcu9iz3i)
  
  * [redux-thunk-tests branch](https://github.com/wix/react-dataflow-example/tree/redux-thunk-tests/src) - Tests for basic Redux (thunks)<br>Walkthrough post: [Redux Testing Step by Step: A Simple Methodology for Testing Business Logic](https://medium.com/@talkol/redux-testing-step-by-step-a-simple-methodology-for-testing-business-logic-8901670756ce)

## Running locally

 * `npm install`
 * `npm start`
 * Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Want to contribute your own flavor?

1. Implement the entire app and reach the same end result using your own methodology
2. Recommended: write a blog post explaining your methodology
3. Submit a pull request and we'll add it as an additional branch

## What does the example app do?

On the first screen, it asks the user for 3 topics they’re interested in. We pull the list of topics from [Reddit](https://www.reddit.com/)’s list of default front page subreddits. After the user makes a choice, it shows the list of posts from each of these 3 topics in a filterable list — all topics or just one of the 3. When the user clicks on a post in the list, the post content is shown.

## License

MIT
