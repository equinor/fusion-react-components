/**
 * @fileoverview Tests for createStyles helper function
 *
 * createStyles is a type-safe helper that provides better TypeScript inference
 * for style objects. It's mainly a convenience function for ensuring proper typing.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { renderHook } from '@testing-library/react';
import { createStyles } from '../create-styles';
import { makeStyles } from '../make-styles';
import { ThemeProvider } from '../ThemeProvider';
import { StylesProvider } from '../StyleProvider';
import type { StyleRules } from '../types';

describe('createStyles - Type-safe style helper', () => {
  beforeEach(() => {
    // Clean up DOM between tests to ensure isolation
    document.head.innerHTML = '';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.head.innerHTML = '';
  });

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

  it('should work with makeStyles to create typed style hooks', () => {
    // WHAT: createStyles can be used with makeStyles for better type inference
    // WHY: Combines the benefits of createStyles (type safety) with makeStyles (runtime CSS generation)

    // Create styles with createStyles for better type inference
    const styles = createStyles({
      root: {
        color: 'blue',
        padding: '10px',
      },
      button: {
        backgroundColor: 'green',
        borderRadius: '4px',
      },
    });

    // Use those styles with makeStyles
    const useStyles = makeStyles(styles, { name: 'TestComponent' });

    // Render the hook with providers
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>
        <StylesProvider>{children}</StylesProvider>
      </ThemeProvider>
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify that makeStyles generated class names from createStyles styles
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
    expect(result.current.button).toBeDefined();
    expect(typeof result.current.root).toBe('string');
    expect(typeof result.current.button).toBe('string');
    expect(result.current.root).not.toBe('');
    expect(result.current.button).not.toBe('');
  });

  it('should work with makeStyles and props-based styles', () => {
    // WHAT: createStyles works with makeStyles even when styles depend on props
    // WHY: Demonstrates the full type-safe workflow for dynamic styles

    type Props = { primary: boolean };
    // Create styles with props using createStyles
    // Note: createStyles generic is <ClassKey, Props>, so we need to specify both
    const styles = createStyles<'root', Props>({
      root: (props: Props) => ({
        color: props.primary ? 'blue' : 'gray',
        fontWeight: props.primary ? 'bold' : 'normal',
      }),
    });

    // Use with makeStyles
    const useStyles = makeStyles(styles, { name: 'TestComponentWithProps' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>
        <StylesProvider>{children}</StylesProvider>
      </ThemeProvider>
    );

    // Test with primary=true
    const { result: resultPrimary } = renderHook(() => useStyles({ primary: true }), { wrapper });
    expect(resultPrimary.current.root).toBeDefined();
    expect(typeof resultPrimary.current.root).toBe('string');

    // Test with primary=false
    const { result: resultSecondary } = renderHook(() => useStyles({ primary: false }), { wrapper });
    expect(resultSecondary.current.root).toBeDefined();
    expect(typeof resultSecondary.current.root).toBe('string');
  });

  it('should work with makeStyles using theme function that wraps createStyles', () => {
    // WHAT: createStyles can be used inside a theme function passed to makeStyles
    // WHY: Demonstrates pattern: makeStyles(theme => createStyles({ ... theme.some }))

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>
        <StylesProvider>{children}</StylesProvider>
      </ThemeProvider>
    );

    // Use createStyles inside a theme function
    // Pattern: makeStyles(theme => createStyles({ ... theme.some }))
    const useStyles = makeStyles(
      (theme) =>
        createStyles({
          root: {
            padding: theme.spacing.comfortable.medium.css,
            backgroundColor: theme.colors.ui.background__default.css,
            color: theme.colors.text.static_icons__default.css,
          },
          title: {
            fontSize: theme.typography.heading.h4.style.fontSize,
            fontWeight: theme.typography.heading.h4.style.fontWeight,
            marginBottom: theme.spacing.comfortable.small.css,
          },
        }),
      { name: 'ThemeWithCreateStyles' },
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify that makeStyles generated class names from createStyles wrapped in theme function
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
    expect(result.current.title).toBeDefined();
    expect(typeof result.current.root).toBe('string');
    expect(typeof result.current.title).toBe('string');
    expect(result.current.root).not.toBe('');
    expect(result.current.title).not.toBe('');
  });
});
