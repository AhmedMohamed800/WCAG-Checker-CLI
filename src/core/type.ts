import { ErrorDetail } from "../wcag/types";

interface ScanOptions {
  level: "A" | "AA" | "AAA";
}

interface Issue {
  rule: string;
  guideline: string;
  description: string;
  level: string;
  issues: ErrorDetail[];
}

interface ScanResult {
  url: string;
  perceivable: { issues: Issue[]; passed: boolean; totalIssues: string };
  understandable: { issues: Issue[]; passed: boolean; totalIssues: string };
  operable: { issues: Issue[]; passed: boolean; totalIssues: string };
  robust: { issues: Issue[]; passed: boolean; totalIssues: string };
  passed: boolean;
  totalIssues: string;
}

export { ScanOptions, Issue, ScanResult };
