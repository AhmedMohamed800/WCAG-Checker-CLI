import { Rule, ErrorDetail } from "../../types";

const rule: Rule = {
  id: "1.1.1",
  guideline: "1.1 Text Alternatives",
  level: "A",
  description: "Non-text content must have text alternatives",
  check: (document: Document) => {
    const issues: ErrorDetail[] = [];
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.hasAttribute("alt")) {
        issues.push({
          message: "Image missing alt attribute",
          element: img.outerHTML,
          solution: "Provide a text alternative for the image",
        });
      }
    });
    return issues;
  },
};

export default rule;
