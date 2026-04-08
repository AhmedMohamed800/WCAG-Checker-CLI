function shouldRunRule(rule: { level: string }, level: string): boolean {
  const levels = ["A", "AA", "AAA"];
  return levels.indexOf(rule.level) <= levels.indexOf(level);
}

export default shouldRunRule;
