/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
