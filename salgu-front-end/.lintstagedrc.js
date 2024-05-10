const path = require("path");

// https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
  "**/*.{json,css,scss,md,yaml}": ["prettier --write"],
};
