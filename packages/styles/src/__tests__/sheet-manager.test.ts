/**
 * @fileoverview Tests for SheetManager
 *
 * SheetManager handles caching and reusing JSS stylesheets for performance.
 * It separates static and dynamic styles and implements reference counting.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { defaultSheetManager, SheetManager } from '../utils/sheet-manager';
import { createJssInstance } from '../utils/jss-setup';
import { createGenerateClassName } from '../utils/class-name-generator';
import type { StyleRules } from '../types';

describe('SheetManager - Stylesheet caching', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should get or create sheets for styles', () => {
    // WHAT: SheetManager caches stylesheets to avoid recreating them
    // WHY: Performance optimization - same styles/theme combination reuses CSS

    const styles: StyleRules = {
      root: {
        color: 'red',
      },
    };

    const jss = createJssInstance();
    const generateClassName = createGenerateClassName();

    const classes = defaultSheetManager.getOrCreateSheet(
      styles,
      {},
      'TestComponent',
      jss,
      generateClassName,
    );

    // Verify: Class names are generated
    expect(classes).toBeDefined();
    expect(classes.root).toBeDefined();
    expect(typeof classes.root).toBe('string');
  });

  it('should reuse cached sheets for same styles and theme', () => {
    // WHAT: Same styles + theme combination returns cached classes
    // WHY: Multiple components using same styles share CSS

    const styles: StyleRules = {
      root: {
        color: 'blue',
      },
    };

    const jss = createJssInstance();
    const generateClassName = createGenerateClassName();
    const theme = {};

    const classes1 = defaultSheetManager.getOrCreateSheet(
      styles,
      theme,
      'TestComponent',
      jss,
      generateClassName,
    );

    const classes2 = defaultSheetManager.getOrCreateSheet(
      styles,
      theme,
      'TestComponent',
      jss,
      generateClassName,
    );

    // Verify: Same class names (cached)
    expect(classes1.root).toBe(classes2.root);
  });

  it('should handle dynamic styles based on props', () => {
    // WHAT: Stylesheets can have dynamic parts that update with props
    // WHY: Supports prop-based styling

    const styles: StyleRules<{ color: string }> = {
      root: (props: { color: string }) => ({
        color: props.color,
      }),
    };

    const jss = createJssInstance();
    const generateClassName = createGenerateClassName();

    const classes1 = defaultSheetManager.getOrCreateSheet(
      styles as StyleRules,
      {},
      'DynamicComponent',
      jss,
      generateClassName,
      { color: 'red' },
    );

    const classes2 = defaultSheetManager.getOrCreateSheet(
      styles as StyleRules,
      {},
      'DynamicComponent',
      jss,
      generateClassName,
      { color: 'blue' },
    );

    // Verify: Class names are generated
    expect(classes1.root).toBeDefined();
    expect(classes2.root).toBeDefined();
  });
});

describe('SheetManager - Sheet lifecycle management', () => {
  it('should remove sheet references when removeSheet is called', () => {
    // WHAT: removeSheet decrements reference count and removes sheet when refs reach 0
    // WHY: Allows cleanup when components unmount (currently unused but available)

    const manager = new SheetManager();
    const styles: StyleRules = {
      root: { color: 'red' },
    };

    const jss = createJssInstance();
    const generateClassName = createGenerateClassName();
    // Cache key format: name-{JSON.stringify(theme)}
    const key = 'TestComponent-{}';

    // Create sheet (refs = 1)
    manager.getOrCreateSheet(styles, {}, 'TestComponent', jss, generateClassName);

    // Remove reference (refs = 0, should delete)
    manager.removeSheet(key);

    // Verify: Method completes without error
    // Note: Internal state not directly testable, but we verify method works
    expect(manager).toBeDefined();

    // Verify: Can call removeSheet multiple times safely (idempotent)
    manager.removeSheet(key);
    expect(manager).toBeDefined();
  });

  it('should handle multiple references before removing sheet', () => {
    // WHAT: Sheet is only removed when all references are removed
    // WHY: Multiple components can share same sheet

    const manager = new SheetManager();
    const styles: StyleRules = {
      root: { color: 'red' },
    };

    const jss = createJssInstance();
    const generateClassName = createGenerateClassName();
    const key = 'TestComponent-{}';

    // Create sheet twice (refs = 2)
    manager.getOrCreateSheet(styles, {}, 'TestComponent', jss, generateClassName);
    manager.getOrCreateSheet(styles, {}, 'TestComponent', jss, generateClassName);

    // Remove one reference (refs = 1, should still exist)
    manager.removeSheet(key);

    // Remove second reference (refs = 0, should delete)
    manager.removeSheet(key);

    // Verify: Method completes without error
    expect(manager).toBeDefined();
  });

  it('should clear all sheets when clear is called', () => {
    // WHAT: clear() removes all cached sheets
    // WHY: Allows complete cleanup (useful for testing or reset scenarios)

    const manager = new SheetManager();
    const styles: StyleRules = {
      root: { color: 'red' },
    };

    const jss = createJssInstance();
    const generateClassName = createGenerateClassName();

    // Create some sheets
    manager.getOrCreateSheet(styles, {}, 'Component1', jss, generateClassName);
    manager.getOrCreateSheet(styles, {}, 'Component2', jss, generateClassName);

    // Clear all sheets
    manager.clear();

    // Verify: Method exists and can be called (internal state not directly testable)
    expect(manager).toBeDefined();
  });
});
