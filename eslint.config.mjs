import js from "@eslint/js"
import tseslint from "typescript-eslint"

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts", "test/**/*.ts", "web_test/**/*.ts", "web_test/**/*.tsx"],
    ignores: ["node_modules", "dist"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
]
