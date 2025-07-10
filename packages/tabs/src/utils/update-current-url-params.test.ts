import { beforeEach, describe, expect, it, vi } from "vitest";
import { updateCurrentUrlParams } from "./update-current-url-params";

describe("updateCurrentUrlParams", () => {
  beforeEach(() => {
    // Mock the window.location object
    const url = "http://example.com/page?bar[foo]=2";

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    window.location = new URL(url) as any;
  });

  it("should update the URL parameters with the provided key-value pairs", () => {
    const newUrl = updateCurrentUrlParams({ "foo[bar]": "3", "bar[foo]": null });
    expect(newUrl).toBe("http://example.com/page?foo[bar]=3");
  });

  it("should remove parameters with null or undefined values", () => {
    const newUrl = updateCurrentUrlParams({ "bar[foo]": null });
    expect(newUrl).toBe("http://example.com/page");
  });

  it("should add new parameters to the URL", () => {
    const newUrl = updateCurrentUrlParams({ "new[param]": "value" });
    expect(newUrl).toBe("http://example.com/page?bar[foo]=2&new[param]=value");
  });

  it("should handle empty paramsObject", () => {
    const newUrl = updateCurrentUrlParams({});
    expect(newUrl).toBe("http://example.com/page?bar[foo]=2");
  });

  it("should handle multiple updates correctly", () => {
    const newUrl = updateCurrentUrlParams({ "foo[bar]": "3", "new[param]": "value" });
    expect(newUrl).toBe("http://example.com/page?bar[foo]=2&foo[bar]=3&new[param]=value");
  });
});
