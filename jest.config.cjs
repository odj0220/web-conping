module.exports = {
    verbose: true,
    transform: {
        "^.+\\.svelte$": [
            "svelte-jester",
            {
                preprocess: "./svelte.config.test.cjs",
            },
        ],
        "^.+\\.ts$": "ts-jest",
        "^.+\\.js$": "ts-jest",
    },
    moduleFileExtensions: ["js", "ts", "svelte"],
    moduleNameMapper: {
        "^\\$lib(.*)$": "<rootDir>/src/lib$1",
        "^\\$components(.*)$": "<rootDir>/src/components$1",
        "^\\$app(.*)$": [
            "<rootDir>/.svelte-kit/dev/runtime/app$1",
            "<rootDir>/.svelte-kit/build/runtime/app$1",
        ],
    },
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    testEnvironment: "jsdom",
};
