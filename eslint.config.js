import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import-x';
import preferArrow from 'eslint-plugin-prefer-arrow';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
  jquery: 'readonly',
  ga: 'readonly',
  __statics: 'readonly',
  chrome: 'readonly',
};

const sharedPlugins = {
  'prefer-arrow': preferArrow,
  import: importPlugin,
  'unused-imports': unusedImports,
};

const sharedRules = {
  'comma-dangle': ['warn', 'always-multiline'],
  'consistent-return': 'off',
  'default-case': 'off',
  'global-require': 'off',

  'import/default': 'error',
  'import/export': 'error',
  'import/extensions': ['error', 'always', {
    ts: 'never',
    js: 'always',
    ignorePackages: true,
  }],
  'import/first': 'off',
  'import/named': 'off',
  'import/namespace': 'error',
  'import/no-extraneous-dependencies': 'off',
  'import/no-unresolved': 'off',
  'import/prefer-default-export': 'off',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],

  'linebreak-style': ['error', 'unix'],
  'max-classes-per-file': 'off',
  'max-len': ['warn', 200],
  'no-console': 'warn',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-nested-ternary': 'off',
  'no-param-reassign': 'off',
  'no-plusplus': 'off',
  'no-shadow': 'off',
  'no-underscore-dangle': 'off',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'no-void': 'off',
  'object-curly-newline': [
    'error',
    {
      ExportDeclaration: { minProperties: 8, multiline: true },
      ImportDeclaration: { minProperties: 8, multiline: true },
      ObjectExpression: { minProperties: 8, multiline: true },
      ObjectPattern: { minProperties: 8, multiline: true },
    },
  ],
  'prefer-promise-reject-errors': 'off',
  quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
  'space-before-function-paren': ['error', 'always'],

  'no-restricted-syntax': 'off',
  'no-await-in-loop': 'off',
  curly: ['error', 'all'],
  'prefer-destructuring': ['error', { object: true, array: false }],
  semi: ['error', 'always'],
  'object-curly-spacing': ['error', 'always'],
  'eol-last': ['error', 'always'],

  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    { args: 'after-used', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_', ignoreRestSiblings: true },
  ],

  'prefer-arrow/prefer-arrow-functions': ['warn', {
    disallowPrototype: false,
    singleReturnOnly: false,
    classPropertiesAllowed: true,
    allowStandaloneDeclarations: true,
  }],
};

export default [
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: sharedGlobals,
    },
    plugins: {
      ...sharedPlugins,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...sharedRules,

      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',

      'import/no-default-export': 'error',
    },
  },
  // Allow default export in package entry points
  {
    files: ['src/index.ts', 'src/index.tsx', 'index.ts', 'index.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: sharedGlobals,
    },
    plugins: sharedPlugins,
    rules: sharedRules,
  },
  // Test files
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  // Ignores
  {
    ignores: [
      '.claude/',
      '.idea/',
      '.run/',
      '_misc/',
      '_tmp/',
      'config/',
      'deploy/',
      '**/dist/',
      'doc/',
      'node_modules/',
      'coverage/',
      '/**/*.min.js',
      '**/*.d.ts',
    ],
  },
];
