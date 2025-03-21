/**
 * Commitlint configuration for conventional commits
 * Enforces commit message format: type(scope): subject
 * 
 * Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Test additions/changes
        'chore', // Build process or auxiliary tool changes
        'ci', // CI/CD changes
        'build', // Build system changes
        'revert', // Revert a previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
}

