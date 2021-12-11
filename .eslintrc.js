module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'eslint:recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: '17.0.2',
        },
    },
    plugins: ['react'],
    rules: {
        indent: ['warn', 4],
        semi: ['warn', 'never'],
        'comma-dangle': ['off', 'always'],
        'object-curly-spacing': ['off', 'always'],
        'space-infix-ops': ['warn'],
        'space-before-function-paren': ['warn', 'always'],
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    },
}
