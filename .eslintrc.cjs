/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    '@aviatakz/eslint-config',
    '@aviatakz/eslint-config-ts',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    //
    /**
     * @description - fastify Reply provides Thenable interface which trigger this error
     * @example
     *
     * fastify.get('', (req, reply) => {
     *   reply.status(200) // eslint error
     * })
     */
    '@typescript-eslint/no-floating-promises': 'off',
    'no-useless-constructor': 'off', //
    '@typescript-eslint/no-useless-constructor': 'error'
  },
};
