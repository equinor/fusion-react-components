/**
 * @fileoverview Tests for class name generator
 *
 * The class name generator creates unique CSS class names for style rules.
 * It supports seed prefixes for isolating styles between different scopes,
 * which is critical for preventing CSS collisions in micro-frontends.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGenerateClassName, defaultGenerateClassName } from '../utils/class-name-generator';

describe('createGenerateClassName - Class name generation', () => {
  beforeEach(() => {
    // Note: Each test creates a new generator instance, so counters reset
  });

  it('should create a function that generates CSS class names for style rules', () => {
    // WHAT: Generator function creates class names for each style rule
    // WHY: Converts style rule names (like 'root', 'button') into CSS class names

    const generate = createGenerateClassName();
    const className = generate({ key: 'root' });

    // Verify: Returns a string class name
    expect(typeof className).toBe('string');
    // Verify: Contains the rule key (e.g., 'root')
    expect(className).toContain('root');
  });

  it('should include seed prefix in class names when provided (for style isolation)', () => {
    // WHAT: Seed prefix creates namespace for class names
    // WHY: Prevents collisions when multiple modules use same style names
    // EXAMPLE: Seed "my-module" produces "my-module-makeStyles-root-1"

    const generate = createGenerateClassName('test-seed');
    const className = generate({ key: 'root' });

    // Verify: Seed prefix is included
    expect(className).toContain('test-seed');
    expect(className).toContain('root');
  });

  it('should generate unique class names for different style rules', () => {
    // WHAT: Each style rule gets its own unique class name
    // WHY: Different rules need different CSS classes
    // EXAMPLE: 'root' and 'button' get different class names

    const generate = createGenerateClassName();
    const className1 = generate({ key: 'root' });
    const className2 = generate({ key: 'button' });

    // Verify: Different rules produce different class names
    expect(className1).not.toBe(className2);
    expect(className1).toContain('root');
    expect(className2).toContain('button');
  });

  it('should generate unique class names even for the same rule (counter increments)', () => {
    // WHAT: Same rule called multiple times gets different class names
    // WHY: Ensures uniqueness even if same rule is used in different contexts

    const generate = createGenerateClassName();
    const className1 = generate({ key: 'root' });
    const className2 = generate({ key: 'root' });

    // Verify: Counter ensures uniqueness
    expect(className1).not.toBe(className2);
  });

  it('should use custom classNamePrefix from sheet options when provided', () => {
    // WHAT: Sheet can specify its own prefix (e.g., component name)
    // WHY: Better debugging - class names show which component they're from
    // EXAMPLE: Button component uses prefix "Button" -> "Button-root-1"

    const generate = createGenerateClassName();
    const sheet = {
      options: {
        classNamePrefix: 'CustomPrefix',
      },
    };

    const className = generate({ key: 'root' }, sheet);
    // Verify: Custom prefix is used
    expect(className).toContain('CustomPrefix');
  });

  it('should use default classNamePrefix "makeStyles" when not provided', () => {
    // WHAT: Default prefix is "makeStyles"
    // WHY: Provides a default naming scheme if none specified

    const generate = createGenerateClassName();
    const className = generate({ key: 'root' });
    // Verify: Default prefix is used
    expect(className).toContain('makeStyles');
  });

  it('should export a default generator instance for convenience', () => {
    // WHAT: defaultGenerateClassName is a ready-to-use generator
    // WHY: Provides a default instance without needing to call createGenerateClassName()

    expect(defaultGenerateClassName).toBeDefined();
    expect(typeof defaultGenerateClassName).toBe('function');

    // Verify: Default generator works
    const className = defaultGenerateClassName({ key: 'test' });
    expect(typeof className).toBe('string');
  });

  it('should generate shorter class names in production mode', () => {
    // WHAT: Production mode generates shorter class names for smaller bundle size
    // WHY: Reduces CSS size in production builds
    // EXAMPLE: Production: "test-seed-jss1", Development: "test-seed-makeStyles-root-1"

    const originalEnv = process.env.NODE_ENV;

    try {
      // Set to production mode
      process.env.NODE_ENV = 'production';

      const generate = createGenerateClassName('test-seed');
      const className = generate({ key: 'root' });

      // Verify: Production format is shorter (seed + jss + counter)
      expect(className).toMatch(/^test-seed-jss\d+$/);
      expect(className).not.toContain('makeStyles');
      expect(className).not.toContain('root');
    } finally {
      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    }
  });
});
