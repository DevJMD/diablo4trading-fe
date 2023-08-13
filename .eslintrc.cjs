module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'lingui.config.ts', '*.d.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.test.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'eslint-plugin-import'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        // disable react/prop-types warning since we're using typescript
        'react/prop-types': 0,

        'import/no-default-export': 'error',
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@mui/*/*/*'],
            },
        ],
    },
    settings: {
        react: { version: 'detect' },
    },
};
