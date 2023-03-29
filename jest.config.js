module.exports = {
  rootDir: "",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|png)$": "identity-obj-proxy",
    '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$': '<rootDir>/fileMock.js'
  },
  transform: {
    "^.+\\.(j|t)sx?$": ["babel-jest", { rootMode: "upward" }],
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/fileMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  setupFiles: ["<rootDir>/setupTests.js"],
  transformIgnorePatterns: ["node_modules/*"],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.jest/",
    "<rootDir>/src/App.tsx",
    "<rootDir>/src/index.tsx",
    ".eslintrc.json",
    "jest.config.json",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
