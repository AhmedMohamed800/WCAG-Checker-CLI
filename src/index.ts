#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";

const program = new Command();

program
  .name("wcag-checker-cli")
  .description("Fast, developer-first accessibility testing for WCAG 2.2")
  .version("0.0.1");

program
  .command("check <url>")
  .description("Check WCAG compliance for a URL")
  .option("-l, --level <level>", "WCAG conformance level A | AA | AAA", "A")
  .action(async (url: string, options: { level: string; output: string }) => {
    const { runScan } = await import("./core/scanner");
    try {
      const result = await runScan(url, {
        level: options.level as "A" | "AA" | "AAA",
      });

      // output results in a json file in results folder
      const path = `results/results[${Date.now()}].json`;
      fs.writeFileSync(path, JSON.stringify(result, null, 2));
      console.log(`Scan completed. Results saved to ${path}`);
    } catch (error) {
      console.error("Error:", error);
    }
  });

program.parse(process.argv);
