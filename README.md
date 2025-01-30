# Next.js Boilerplate

This is a **Next.js** boilerplate configured with ESLint, Prettier, TailwindCSS, Husky, and Lint-staged. It also includes **shadcn/ui** for easy component integration. This setup ensures that your project is linted, formatted, and follows best practices during development and before commits.

## Features

- **Next.js**: Core framework for server-rendered or static-generated React applications.
- **ESLint**: JavaScript/TypeScript linting with custom rules and Prettier integration.
- **Prettier**: Automatic code formatting for consistent style across the codebase.
- **TailwindCSS**: Utility-first CSS framework to quickly build modern user interfaces.
- **Husky**: Git hooks to run tasks such as linting and formatting before committing code.
- **Lint-staged**: Ensures that only staged files are linted and formatted during commit.
- **shadcn/ui**: A UI library built for React to create customizable components quickly.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:

- **Node.js** (v14 or newer)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jleveneur/next-boilerplate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd next-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up Husky hooks:

   ```bash
   npx husky install
   ```

### Scripts

Here are the key scripts to manage the project:

- **Development**:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  Starts the development server.

- **Build**:

  ```bash
  npm run build
  # or
  yarn build
  ```

  Builds the production version of the project.

- **Lint**:

  ```bash
  npm run lint
  # or
  yarn lint
  ```

  Runs ESLint for code quality checks.

- **Format**:
  ```bash
  npm run format
  # or
  yarn format
  ```
  Runs Prettier to format your code.

### Project Structure

```
.
├── .github               # GitHub folder
├── .husky/               # Husky configuration for git hooks
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App (App Router)
│   ├── components/       # Reusable UI components
│   ├── constants/        # Constants and enums
│   ├── features/         # Feature modules
│   |── hooks/            # Custom hooks
│   ├── lib/              # 3rd party libraries configuration
│   ├── styles/           # Global styles including Tailwind
│   └── tests/            # Test files
├── .env.example          # Environment variables example
├── commitlint.config.ts  # Commitlint configuration
├── eslint.config.mjs     # ESLint configuration
├── lint-staged.config.mjs # Lint-staged configuration
├── next.config.ts        # Next.js configuration
├── package.json          # NPM package configuration
├── playwright.config.ts  # Playwright configuration
├── postcss.config.mjs    # PostCSS configuration
├── prettier.config.mjs   # Prettier configuration
├── sentry.client.config.ts # Sentry configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vitest.config.ts      # Vitest configuration
```

### ESLint Configuration

The project uses **eslint-config-prettier** and **eslint-plugin-prettier** to avoid conflicts between ESLint and Prettier. Here's the core configuration:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier", "tailwindcss"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "tailwindcss/classnames-order": "off"
  }
}
```

### Prettier Configuration

The project follows Prettier's formatting rules with slight customizations:

```javascript
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
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
```

### Husky & Lint-staged Configuration

**Husky** is set up to run **Lint-staged** on each commit. The `pre-commit` hook ensures code is linted and formatted before being committed.

**package.json**:

```json
"lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
        "eslint --max-warnings=0",
        "prettier --write"
    ],
    "**/*.{json,css,scss,md,webmanifest}": [
        "prettier --write"
    ]
}
```

### TailwindCSS Setup

TailwindCSS is included and configured for utility-first styling. You can easily extend the default configuration in `tailwind.config.ts`.

## Customization

Feel free to customize the configurations of **ESLint**, **Prettier**, **TailwindCSS**, and other tools based on your project's specific needs.

## License

This project is licensed under the MIT License.
