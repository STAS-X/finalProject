module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        semi: [2, "always"],
        indent: ["error", 4, {
            ignoredNodes: ["ConditionalExpression"],
            VariableDeclarator: { var: 2, let: 2, const: 3 },
            FunctionDeclaration: { parameters: "first" }
        }],
        "space-before-function-paren": [
            "warn",
            { anonymous: "always", named: "never" }
        ],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ]
    }
};
