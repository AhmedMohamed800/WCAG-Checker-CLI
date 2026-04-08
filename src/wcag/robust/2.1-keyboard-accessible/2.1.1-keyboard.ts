import { Rule, ErrorDetail } from "../../types";

const rule: Rule = {
  id: "2.1.1",
  guideline: "2.1 Keyboard Accessibility",
  level: "A",
  description:
    "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.",
  check: (document: Document) => {
    const issues: ErrorDetail[] = [];
    const interactiveElements = document.querySelectorAll(
      "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    interactiveElements.forEach((el) => {
      if (el.getAttribute("tabindex") === "-1") {
        issues.push({
          message: "Element is not keyboard accessible",
          element: el.outerHTML,
          solution:
            "Ensure the element can be focused and activated using a keyboard",
        });
      }
    });
    return issues;
  },
};

export default rule;
