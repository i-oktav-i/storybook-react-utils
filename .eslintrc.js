module.exports = {
  parser:  '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  env:     {
    node:    true,
    jest:    true,
    browser: true,
  },
  parserOptions: {
    sourceType:   'module',
    ecmaVersion:  2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'no-shadow':                   0,
    'newline-before-return':       'error',
    'arrow-parens':                ['error', 'as-needed'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-plusplus':                 ['error', { allowForLoopAfterthoughts: true }],
    'key-spacing':                 ['warn', {
      singleLine: {
        beforeColon: false,
        afterColon:  true,
      },
      multiLine: {
        beforeColon: false,
        afterColon:  true,
        align:       'value',
      },
    }],
    'no-return-await':                     0,
    'object-curly-spacing':                ['error', 'always'],
    'max-len':                             ['error', 120],
    'react/react-in-jsx-scope':            0,
    'react/jsx-uses-react':                0,
    'react/jsx-filename-extension':        ['error', { extensions: ['.tsx'] }],
    'react-hooks/rules-of-hooks':          'error',
    'react-hooks/exhaustive-deps':         'warn',
    'react/prop-types':                    0,
    'react/jsx-key':                       'error',
    'react/require-default-props':         0,
    'react/jsx-props-no-spreading':        0,
    'react/function-component-definition': ['warn', {
      namedComponents:   'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'jsx-a11y/click-events-have-key-events':   0,
    'jsx-a11y/no-static-element-interactions': 0,
    'import/prefer-default-export':            0,
    'import/no-extraneous-dependencies':       0,
    'import/extensions':                       0,
    'import/order':                            ['error', {
      groups:             ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      'newlines-between': 'always-and-inside-groups',
    }],
    '@typescript-eslint/no-empty-interface':             ['error', { allowSingleExtends: true }],
    '@typescript-eslint/no-unused-vars':                 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-shadow':                      'error',
  },
  globals: {
  },
};
