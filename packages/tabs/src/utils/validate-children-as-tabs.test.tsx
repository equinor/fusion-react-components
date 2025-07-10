import { describe, expect, it } from "vitest";

import { Tab } from "../components/Tab";
import { validateChildrenAsTabs } from "./validate-children-as-tabs";

describe("validateChildrenAsTabs", () => {
  it("should return true when all children are of type Tab", () => {
    const children = (
      <>
        <Tab title="" id="" />
        <Tab title="" id="" />
        <Tab title="" id="" />
        <Tab title="" id="" />
      </>
    );
    expect(validateChildrenAsTabs(children)).toBe(true);
  });

  it("should return false when some children are not of type Tab", () => {
    const children = (
      <>
        <Tab title="" id="" />
        <div>Not a Tab</div>
        <Tab title="" id="" />
      </>
    );
    expect(validateChildrenAsTabs(children)).toBe(false);
  });

  it("should return false when no children are of type Tab", () => {
    const children = (
      <>
        <div>Not a Tab</div>
        <div>Not a Tab</div>
      </>
    );
    expect(validateChildrenAsTabs(children)).toBe(false);
  });

  it("should return false when there are no children", () => {
    const children = <></>;
    expect(validateChildrenAsTabs(children)).toBe(false);
  });

  it("should return false when children are null or undefined", () => {
    expect(validateChildrenAsTabs(null)).toBe(false);
    expect(validateChildrenAsTabs(undefined)).toBe(false);
  });
});
