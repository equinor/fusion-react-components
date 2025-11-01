/**
 * @fileoverview Tests for createStyles helper function
 *
 * createStyles is a type-safe helper that provides better TypeScript inference
 * for style objects. It's mainly a convenience function for ensuring proper typing.
 */

import { describe, it, expect } from 'vitest';
import { createStyles } from '../create-styles';
import type { StyleRules } from '../types';

describe('createStyles - Type-safe style helper', () => {
  it('should return the provided styles object unchanged', () => {
    // WHAT: createStyles returns the same object you pass in
    // WHY: It's mainly for TypeScript type inference, not runtime transformation

    const styles: StyleRules = {
      root: {
        color: 'red',
      },
    };

    const result = createStyles(styles);
    // Should return the same object
    expect(result).toBe(styles);
  });

  it('should handle empty style objects', () => {
    // WHAT: createStyles works with empty objects
    // WHY: Some components might not have styles initially

    const styles: StyleRules = {};
    const result = createStyles(styles);
    expect(result).toBe(styles);
  });

  it('should handle undefined styles', () => {
    // WHAT: createStyles accepts undefined
    // WHY: Allows optional styles in some use cases

    const result = createStyles(undefined);
    expect(result).toBeUndefined();
  });

  it('should preserve style rules that use props functions', () => {
    // WHAT: createStyles works with dynamic styles (functions)
    // WHY: Maintains type safety even when styles depend on props

    type Props = { color: string };
    const styles: StyleRules<Props> = {
      root: (props: Props) => ({
        color: props.color,
      }),
    };

    const result = createStyles(styles);
    // Should return the same object with proper typing
    expect(result).toBe(styles);
  });
});
