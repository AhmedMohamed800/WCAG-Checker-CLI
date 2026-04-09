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

    // Check area elements in image maps
    const areas = document.querySelectorAll("area");
    areas.forEach((area) => {
      if (!area.hasAttribute("alt")) {
        issues.push({
          message: "Area element missing alt attribute",
          element: area.outerHTML,
          solution: "Provide a text alternative for the area",
        });
      }
    });

    // Check input elements of type image
    const imageInputs = document.querySelectorAll("input[type='image']");
    imageInputs.forEach((input) => {
      if (!input.hasAttribute("alt") && !input.hasAttribute("title")) {
        issues.push({
          message: "Input image missing alt or title attribute",
          element: input.outerHTML,
          solution: "Provide a text alternative for the input image",
        });
      }
    });

    return issues;
  },
};

export default rule;
