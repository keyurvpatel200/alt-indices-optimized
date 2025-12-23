import react from 'eslint-plugin-react'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import globals from 'globals'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      '@stylistic/ts': stylisticTs,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'object-curly-spacing': [1, 'always'],
      'react/jsx-curly-spacing': [1, 'always'],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/quotes': ['error', 'single'],
      // TODO define all props and remove
      'react/prop-types': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      // TODO define all types and remove
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)