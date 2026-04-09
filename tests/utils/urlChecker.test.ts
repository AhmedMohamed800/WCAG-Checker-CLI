import urlChecker from "../../src/utils/urlChecker";

describe("urlChecker", () => {
  // ✅ Valid URLs
  it("should return true for valid http URL", () => {
    expect(urlChecker("http://example.com")).toBe(true);
  });

  it("should return true for valid https URL", () => {
    expect(urlChecker("https://example.com")).toBe(true);
  });

  it("should return true for URL with www", () => {
    expect(urlChecker("https://www.example.com")).toBe(true);
  });

  it("should return true for URL with path and query", () => {
    expect(urlChecker("https://example.com/path?name=ahmed&age=25")).toBe(true);
  });

  it("should return true for complex URL", () => {
    expect(urlChecker("https://sub.domain-example.com:8080/path#section")).toBe(
      true,
    );
  });

  // ❌ Invalid URLs
  it("should return false for missing protocol", () => {
    expect(urlChecker("example.com")).toBe(false);
  });

  it("should return false for invalid protocol", () => {
    expect(urlChecker("ftp://example.com")).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(urlChecker("")).toBe(false);
  });

  it("should return false for random text", () => {
    expect(urlChecker("not a url")).toBe(false);
  });

  it("should return false for malformed URL", () => {
    expect(urlChecker("http:/example.com")).toBe(false);
  });
});
