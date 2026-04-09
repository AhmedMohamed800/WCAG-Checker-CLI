import getRenderedContent from "../../src/utils/getRenderedContent";

describe("getRenderedContent", () => {
  it("should fetch and render the content of a webpage SSR", async () => {
    const url = "https://www.google.com";

    const document = await getRenderedContent(url);

    expect(document).toBeDefined();
    expect(document.querySelector("title")?.textContent).toBe("Google");
  });
});
