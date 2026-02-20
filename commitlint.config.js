/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "ci", "build"],
    ],
    "subject-case": [2, "always", "sentence-case"],
    "header-max-length": [2, "always", 100],
  },
};
