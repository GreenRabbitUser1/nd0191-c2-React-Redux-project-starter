export default {
    testEnvironment : "jsdom",
    transform : {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transpile modern JS and JSX
    },
    moduleNameMapper : {
        "^@/(.*)$": "<rootDir>/src/$1", // Match Vite's @ alias
        "\\.(css|scss|less)$": "identity-obj-proxy", // Mock CSS imports
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom'
    },
    moduleDirectories : [
        "node_modules", "src"
    ], // Allow absolute imports from `src`
    setupFilesAfterEnv : ["<rootDir>/jest.setup.js"], // Jest setup for testing library
};