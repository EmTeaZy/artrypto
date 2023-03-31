module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
        '\\.(png|jpg|jpeg|gif|svg)$': 'jest-static-stubs/$1',
        '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
