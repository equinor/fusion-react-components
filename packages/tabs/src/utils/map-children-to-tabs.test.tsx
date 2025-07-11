import { Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { Tab } from '../components/Tab';
import { mapChildrenToTabs } from './map-children-to-tabs';

describe('mapChildrenToTabs', () => {
  it('should return an empty array when no children are provided', () => {
    const result = mapChildrenToTabs(null);
    expect(result).toEqual({ left: [], right: [] });
  });

  it('should map a single Tabs child to a tab object', () => {
    const children = (
      <Tab title="Tab 1" id="tab1">
        <div>Content 1</div>
      </Tab>
    );

    const result = mapChildrenToTabs(children);
    expect(result).toEqual({
      left: [
        {
          title: 'Tab 1',
          id: 'tab1',
          right: false,
          children: <div>Content 1</div>,
        },
      ],
      right: [],
    });
  });

  it('should map multiple Tabs children to tab objects', () => {
    const children = (
      <>
        <Tab id="tab1" title="Tab 1">
          <div>Content 1</div>
        </Tab>
        <Tab id="tab2" title="Tab 2">
          <div>Content 2</div>
        </Tab>
      </>
    );

    const result = mapChildrenToTabs(children);
    expect(result).toEqual({
      left: [
        {
          title: 'Tab 1',
          id: 'tab1',
          right: false,
          children: <div>Content 1</div>,
        },
        {
          title: 'Tab 2',
          id: 'tab2',
          right: false,
          children: <div>Content 2</div>,
        },
      ],
      right: [],
    });
  });
  it('should map multiple Tabs children in both right and left tab objects', () => {
    const children = (
      <>
        <Tab id="tab1" right title="Tab 1">
          <div>Content 1</div>
        </Tab>
        <Tab id="tab2" title="Tab 2">
          <div>Content 2</div>
        </Tab>
        <Tab id="tab3" title="Tab 3">
          <div>Content 3</div>
        </Tab>
      </>
    );

    const result = mapChildrenToTabs(children);
    expect(result).toEqual({
      left: [
        {
          title: 'Tab 2',
          id: 'tab2',
          right: false,
          children: <div>Content 2</div>,
        },
        {
          title: 'Tab 3',
          id: 'tab3',
          right: false,
          children: <div>Content 3</div>,
        },
      ],
      right: [
        {
          title: 'Tab 1',
          id: 'tab1',
          right: true,
          children: <div>Content 1</div>,
        },
      ],
    });
  });

  it('should recursively process children inside a Fragment', () => {
    const children = (
      <Fragment>
        <Tab id="tab1" title="Tab 1">
          <div>Content 1</div>
        </Tab>
        <Fragment>
          <Tab id="tab2" title="Tab 2">
            <div>Content 2</div>
          </Tab>
        </Fragment>
      </Fragment>
    );

    const result = mapChildrenToTabs(children);
    expect(result).toEqual({
      left: [
        {
          title: 'Tab 1',
          id: 'tab1',
          right: false,
          children: <div>Content 1</div>,
        },
        {
          title: 'Tab 2',
          id: 'tab2',
          right: false,
          children: <div>Content 2</div>,
        },
      ],
      right: [],
    });
  });
  it('should ignore non-Tabs children', () => {
    const children = (
      <>
        <div>Not a tab</div>
        <Tab id="tab1" title="Tab 1">
          <div>Content 1</div>
        </Tab>
      </>
    );

    const result = mapChildrenToTabs(children);
    expect(result).toEqual({
      left: [
        {
          title: 'Tab 1',
          id: 'tab1',
          right: false,
          children: <div>Content 1</div>,
        },
      ],
      right: [],
    });
  });
});
