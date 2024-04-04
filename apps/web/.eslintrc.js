/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  parser: "@typescript-eslint/parser",
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "tailwindcss/no-custom-classname": "off",
    "@next/next/no-img-element": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^react", "^@?\\w"], // External packages.
              ["^@(/.*|$)"], // Internal packages.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // Parent imports. Put `..` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // // Other relative imports. Put same-folder imports and `.` last.
              ["^\\u0000"], // Side effect imports.
              ["^.+\\.s?css$", "^.+\\.(jpe?g|png|gif|svg)$"], // Style and image imports.
            ],
          },
        ],
      },
    },
  ],
}
