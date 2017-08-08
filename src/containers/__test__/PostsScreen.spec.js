import React from 'react';
import { mount } from 'enzyme';
import { AppStore } from '../../stores/AppStore';
import redditService from '../../services/reddit';
import * as Sinon from 'sinon';
import PostsScreen from '../PostsScreen';

const mockTopics = [{
  title: 'title1',
  description: 'desc1',
  url: 'url1'
}, {
  title: 'title2',
  description: 'desc2',
  url: 'url2'
},
{
  title: 'title3',
  description: 'desc3',
  url: 'url3'
},
{
  title: 'title4',
  description: 'desc4',
  url: 'url4'
}]

const mockPosts = [
{
        id: 'id1',
        title: 'title1',
        topicUrl: 'url1',
        body: undefined,
        thumbnail: 'thumbnail2',
        url: 'someUrl1'
      },
      {
        id: 'id2',
        title: 'title2',
        topicUrl: 'url2',
        body: 'body2',
        thumbnail: 'thumbnail2',
        url: 'someUrl2'
      },
       {
        id: 'id3',
        title: 'title3',
        topicUrl: 'url3',
        body: 'body3',
        thumbnail: 'thumbnail3',
        url: 'someUrl3'
      }
];

describe('PostsScreen,', () => {
  let component;
  let appStore;
  let postsStore;
  let topicsStore;

  beforeEach(() => {
    redditService.getDefaultSubreddits = Sinon.spy();
    redditService.getPostsFromSubreddit = Sinon.spy();
    appStore = new AppStore();
    postsStore = appStore.postsStore;
    topicsStore = appStore.topicsStore;
    mockTopics.forEach(topic => topicsStore.selectTopic(topic)); //set selected topics
    component = mount(<PostsScreen postsStore={postsStore} topicsStore={topicsStore}/>);
  });

  it('should render a loader if there are no posts', () => {
    postsStore.setPostsList([]);
    expect(component.find('[data-hook="loader"]').length).toEqual(1);
  });

  it('should render topic filters acording to the selected topics', () => {
    postsStore.setPostsList(mockPosts);
    const filters = component.find('[data-hook="filter"]');
    expect(filters.length).toEqual(4);
    const filtersText= filters.map(filter => filter.text());
    expect(filtersText).toEqual(['All', 'title2', 'title3', 'title4']);
  });

  it('should change current filter on click', () => {
    postsStore.setPostsList(mockPosts);
    const thirdFilter = component.find('[data-hook="filter"]').at(2);
    thirdFilter.simulate('click');
    expect(postsStore.currentFilter).toEqual('url3');
  });

  it('should filter posts according to current filter', () => {
    postsStore.setPostsList(mockPosts);
    postsStore.setCurrentFilter('url3');
    const post = component.find('[data-hook="postTitle"]');
    expect(post.text()).toEqual('title3');
  });

  it('should set post as selected on click', () => {
    postsStore.setPostsList(mockPosts);
    const post = component.find('[data-hook="postTitle"]').at(0);
    post.simulate('click');
    expect(postsStore.currentPost).toEqual(mockPosts[0]);
  });

  it('should preview selected post', () => {
    postsStore.setPostsList(mockPosts);
    expect(component.find('[data-hook="urlPreview"]').length).toEqual(0);
    postsStore.setCurrentPost(mockPosts[0]);
    expect(component.find('[data-hook="urlPreview"]').length).toEqual(1);
  });
});