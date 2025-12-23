// eslint.config.mjs
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["app/**/*.ts", "test/**/*.ts"],
    plugins: {
      "@typescript-eslint": typescriptEslintEslintPlugin,
    },
  },
  {
    rules: {},
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  }
);
