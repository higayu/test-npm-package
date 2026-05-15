import { describe, expect, it } from "vitest";
import myPackage, { normalize } from "./index";

describe("normalize", () => {
  it("trims string values", () => {
    expect(normalize("  hello  ")).toBe("hello");
  });

  it("returns empty string for nullish values", () => {
    expect(normalize(null)).toBe("");
    expect(normalize(undefined)).toBe("");
  });

  it("coerces non-string values", () => {
    expect(normalize(42)).toBe("42");
  });
});

describe("default export", () => {
  it("delegates to normalize", () => {
    expect(myPackage("  test  ")).toBe("test");
  });
});
