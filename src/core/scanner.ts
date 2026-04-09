import { JSDOM } from "jsdom";
import { allRules } from "../wcag/index";
import urlChecker from "../utils/urlChecker";
import shouldRunRule from "../utils/shouldRunRule";
import { Issue, ScanOptions, ScanResult } from "./type";
import getRenderedDocument from "../utils/getRenderdContent";

export async function runScan(
  url: string,
  options: ScanOptions,
): Promise<ScanResult> {
  if (!urlChecker(url)) {
    throw new Error(
      "Invalid URL format provided. Please provide a valid URL starting with http:// or https://",
    );
  }
  const document = await getRenderedDocument(url);

  const results: Issue[] = [];

  for (const rule of Object.values(allRules).flat()) {
    // Filter by WCAG level
    if (!shouldRunRule(rule, options.level)) continue;

    const issues = rule.check(document);

    if (issues.length > 0) {
      results.push({
        rule: rule.id,
        guideline: rule.guideline,
        description: rule.description,
        level: rule.level,
        issues,
      });
    }
  }

  const perceivableResults = results.filter((r: Issue) =>
    r.rule.startsWith("1."),
  );
  const operableResults = results.filter((r: Issue) => r.rule.startsWith("2."));
  const understandableResults = results.filter((r: Issue) =>
    r.rule.startsWith("3."),
  );
  const robustResults = results.filter((r: Issue) => r.rule.startsWith("4."));

  return {
    url,
    perceivable: {
      issues: perceivableResults,
      passed: perceivableResults.length === 0,
      totalIssues: `${allRules.perceivable.length - perceivableResults.length} passed from ${allRules.perceivable.length} rules`,
    },
    operable: {
      issues: operableResults,
      passed: operableResults.length === 0,
      totalIssues: `${allRules.operable.length - operableResults.length} passed from ${allRules.operable.length} rules`,
    },
    understandable: {
      issues: understandableResults,
      passed: understandableResults.length === 0,
      totalIssues: `${allRules.understandable.length - understandableResults.length} passed from ${allRules.understandable.length} rules`,
    },
    robust: {
      issues: robustResults,
      passed: robustResults.length === 0,
      totalIssues: `${allRules.robust.length - robustResults.length} passed from ${allRules.robust.length} rules`,
    },

    passed: results.length === 0,
    totalIssues: `${Object.values(allRules).flat().length - results.length} passed from ${Object.values(allRules).flat().length} rules`,
  };
}
