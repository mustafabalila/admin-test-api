module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    MONGODB_URL: 'mongodb+srv://mustafa:8tjU7gRgx2@diarme.ivpot.mongodb.net/task-test-db?retryWrites=true&w=majority',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
