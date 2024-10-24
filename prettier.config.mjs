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
  importOrder: [
    '^(react|next?/?([a-zA-Z/]*))$',
    '<THIRD_PARTY_MODULES>',
    '^@/components(.*)$',
    '^@/constants(.*)$',
    '^@/env(.*)$',
    '^@/features(.*)$',
    '^@/lib(.*)$',
    '^@/styles(.*)$',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
};

export default config;
