import React from 'react';
import { mount } from 'enzyme';
import TopicsScreen from '../TopicsScreen';
import { AppStore } from '../../stores/AppStore';
import redditService from '../../services/reddit';
import * as Sinon from 'sinon';

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

describe('TopicsScreen,', () => {
  let component;
  let appStore;
  let topicsStore;

  beforeEach(() => {
    redditService.getDefaultSubreddits = Sinon.spy();
    redditService.getPostsFromSubreddit = Sinon.spy();
    appStore = new AppStore();
    topicsStore = appStore.topicsStore;
    component = mount(<TopicsScreen appStore={appStore} topicsStore={topicsStore}/>);
  });

  it('should present loading screen if there are no topics to present', () => {
    topicsStore.setTopicsList([]);
    expect(component.find('[data-hook="loader"]').length).toEqual(1);
  });

  it('should trigger fetch of topics on mount', () => {
    expect(redditService.getDefaultSubreddits.callCount).toEqual(1);
  });

  it('should present list of topics if topics array is not empty', () => {
    topicsStore.setTopicsList(mockTopics);
    expect(component.find('[data-hook="listRow"]').length).toEqual(4);
  });

  it('should allow selecting up to 3 topics', () => {
    topicsStore.setTopicsList(mockTopics);
    component.find('[data-hook="listRow"]').forEach(node => node.simulate('click'));
    expect(topicsStore.selectedTopicsList.length).toEqual(3);
    expect(component.find('[data-hook="listRow"]'))
  });

  it('should drop the oldest selected topic when selecting the 4th topic', () => {
    topicsStore.setTopicsList(mockTopics);
    component.find('[data-hook="listRow"]').forEach(node => node.simulate('click'));
    expect(topicsStore.selectedTopicsList[0].url).toEqual('url2');
  });

  it('should present a nextButton only if there are 3 topics selected.', () => {
    topicsStore.setTopicsList(mockTopics);
    const rows = component.find('[data-hook="listRow"]');
    rows.at(0).simulate('click');
    expect(component.find('[data-hook="nextButton"]').length).toEqual(0);
    rows.at(1).simulate('click');
    expect(component.find('[data-hook="nextButton"]').length).toEqual(0);
    rows.at(2).simulate('click');
    expect(component.find('[data-hook="nextButton"]').length).toEqual(1);
  });
  
  it('should move to next page when clicking on next button', () => {
    topicsStore.setTopicsList(mockTopics);
    component.find('[data-hook="listRow"]').forEach(node => node.simulate('click'));
    component.find('[data-hook="nextButton"]').simulate('click');
    expect(appStore.isSelectionFinalized).toEqual(true);
  });
  
  it('should prefetch posts if there are already 3 posts selected', () => {
    topicsStore.setTopicsList(mockTopics);
    const rows = component.find('[data-hook="listRow"]');
    rows.at(0).simulate('click');
    rows.at(1).simulate('click');
    expect(redditService.getPostsFromSubreddit.callCount).toEqual(0);
    rows.at(2).simulate('click');
    expect(redditService.getPostsFromSubreddit.callCount).toEqual(3);
    expect(redditService.getPostsFromSubreddit.getCall(0).args[0]).toEqual(mockTopics[0].url);
    expect(redditService.getPostsFromSubreddit.getCall(1).args[0]).toEqual(mockTopics[1].url);
    expect(redditService.getPostsFromSubreddit.getCall(2).args[0]).toEqual(mockTopics[2].url);
  });
});