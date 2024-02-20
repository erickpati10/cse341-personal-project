module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};
