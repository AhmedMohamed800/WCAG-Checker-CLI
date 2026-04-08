interface ErrorDetail {
  message: string;
  element: string;
  solution: string;
}

interface Rule {
  id: string;
  guideline: string;
  level: "A" | "AA" | "AAA";
  description: string;
  check: (document: Document) => ErrorDetail[];
}

export { ErrorDetail, Rule };
