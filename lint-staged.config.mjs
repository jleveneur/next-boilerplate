/** @type {import('lint-staged').Configuration} */
const config = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix --no-warn-ignored'],
  '**/*.{json,css,scss,md,webmanifest}': ['prettier --write'],
  '**/*.ts?(x)': () => 'npm run type-check',
};

export default config;
