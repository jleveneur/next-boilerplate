import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/coverage/',
      '**/.next/',
      '**/out/',
      '**/public/',
      '**/*.min.js',
      '**/*.bundle.js',
      '**/*.map',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:tailwindcss/recommended',
      'plugin:unicorn/recommended',
      'plugin:import/recommended',
      'plugin:playwright/recommended',
      'next/core-web-vitals',
      'next/typescript'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      tailwindcss: fixupPluginRules(tailwindcss),
      boundaries,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'app',
          pattern: 'src/app/**/*',
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/components/**/*',
            'src/constants/**/*',
            'src/hooks/**/*',
            'src/lib/**/*',
            'src/locales/**/*',
            'src/styles/**/*',
            'src/types/**/*',
          ],
        },
        {
          mode: 'full',
          type: 'neverImport',
          pattern: ['src/tests/**/*', 'src/*'],
        },
      ],
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'tailwindcss/classnames-order': 'off',
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['app', 'neverImport'],
              allow: ['feature', 'shared'],
            },
            {
              from: 'feature',
              allow: [
                'shared',
                [
                  'feature',
                  {
                    featureName: '${from.featureName}',
                  },
                ],
              ],
            },
            {
              from: 'shared',
              allow: ['shared'],
            },
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-document-cookie': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            e2e: true,
          },
          replacements: {
            env: false,
            params: false,
            props: false,
            ref: false,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
];

export default config;
