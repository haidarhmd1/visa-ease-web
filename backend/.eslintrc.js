module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['jest', 'sonarjs', 'security', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'unicorn/switch-case-braces': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-lines': [2, { max: 250, skipBlankLines: true, skipComments: true }],
    complexity: 2,
    'no-await-in-loop': 0,
    'no-use-before-define': 0,
    'no-process-exit': 0,
    'no-void': [2, { allowAsStatement: true }],
    'node/exports-style': [2, 'module.exports'],
    'unicorn/filename-case': [0, { case: 'camelCase' }],
    'promise/always-return': 0,
    'unicorn/no-null': 0,
    'unicorn/no-process-exit': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/number-literal-case': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/numeric-separators-style': 0,
    'sonarjs/no-nested-template-literals': 0,
    'class-methods-use-this': 0,
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/ban-ts-comment': [
      2,
      { 'ts-ignore': 'allow-with-description' },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': 'warning',
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'import/extensions': [1, 'never'],
    'import/no-unresolved': 'error',
    'import/no-restricted-paths': [
      2,
      {
        zones: [
          {
            target: './src/',
            from: './scripts',
            message:
              'Do not import files in scripts/ as modules! Scripts are meant to be run from shell commands.',
          },
        ],
      },
    ],
    'node/no-missing-import': [
      'error',
      {
        allowModules: [
          'utils',
          'database',
          'middlewares',
          'constants',
          'passport',
          'routes',
          'types',
        ],
        tryExtensions: ['.js', '.ts'],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    node: {
      tryExtensions: ['.js', '.ts', '.d.ts'],
    },
    'import/resolver': {
      typescript: {
        extensions: ['.js', '.ts'],
      },
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
      node: ['.js', '.ts'],
    },
  },
  ignorePatterns: ['config/*.js', '.eslintrc.js', 'jest.config.js'],
  overrides: [
    {
      files: ['src/testHelpers/*.ts', '*.test.ts'],
      rules: {
        'node/no-unpublished-require': 0,
        'node/no-unpublished-import': 0,
        'security/detect-object-injection': 0,
        'import/no-extraneous-dependencies': 0,
        'unicorn/no-useless-undefined': 0,
        'sonarjs/no-duplicate-string': 0,
        'no-unused-expressions': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        'security/detect-non-literal-fs-filename': 0,
        'jest/no-identical-title': 'error',
      },
    },
    {
      files: ['*.test.js', '*.test.ts', 'src/@types/*'],
      rules: {
        'max-lines': 0,
        'unicorn/filename-case': 0,
      },
    },
    {
      files: ['src/database/migrations/*.ts', 'config/*.ts'],
      rules: {
        'unicorn/filename-case': 0,
        'no-console': 0,
        'sonarjs/no-duplicate-string': 0,
      },
    },
    {
      files: ['src/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        'unicorn/prefer-module': 0,
      },
    },
    {
      files: ['src/database/seeds/**/*'],
      rules: {
        'no-console': 0,
        'max-lines': 0,
        'unicorn/filename-case': 0,
      },
    },
    {
      files: ['scripts/**/*'],
      rules: {
        'global-require': 0,
        'security-node/detect-non-literal-require-calls': 0,
        'import/no-dynamic-require': 0,
        'security/detect-non-literal-require': 0,
      },
    },
  ],
};
