import eslintNextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      "@next/next": eslintNextPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...eslintNextPlugin.configs.recommended.rules,
      ...eslintNextPlugin.configs["core-web-vitals"].rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "prisma/**",
      "build/**",
      "node_modules/**",
      "dist/**",
      ".cache/**",
      "coverage/**",
      "*.min.js",
      "*.config.js",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
