import { describe, expect, it } from 'vitest';

import { Tab } from '../components/Tab';
import { validateChildrenAsTabs } from './validate-children-as-tabs';

describe('validateChildrenAsTabs', () => {
  it('should return true when all children are of type Tab', () => {
    const children = (
      <>
        <Tab title="title1" id="id1" />
        <Tab title="title2" id="id2" />
        <Tab title="title3" id="id3" />
        <Tab title="title4" id="id4" />
      </>
    );
    expect(validateChildrenAsTabs(children)).toBe(true);
  });

  it('should return false when some children are not of type Tab', () => {
    const children = (
      <>
        <Tab title="title1" id="id1" />
        <div>Not a Tab</div>
        <Tab title="title2" id="id2" />
      </>
    );
    expect(validateChildrenAsTabs(children)).toBe(false);
  });

  it('should return false when no children are of type Tab', () => {
    const children = (
      <>
        <div>Not a Tab</div>
        <div>Not a Tab</div>
      </>
    );
    expect(validateChildrenAsTabs(children)).toBe(false);
  });

  it('should return false when there are no children', () => {
    const children = <></>;
    expect(validateChildrenAsTabs(children)).toBe(false);
  });

  it('should return false when children are null or undefined', () => {
    expect(validateChildrenAsTabs(null)).toBe(false);
    expect(validateChildrenAsTabs(undefined)).toBe(false);
  });
});
