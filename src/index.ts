#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("wcag-checker-cli")
  .description("Fast, developer-first accessibility testing for WCAG 2.2")
  .version("0.0.1");

program.parse(process.argv);
