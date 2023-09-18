import type { StyleRules } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
export const createStyles = <ClassKey extends string, Props extends {}>(
  styles?: StyleRules<Props, ClassKey>,
): StyleRules<Props, ClassKey> | never => styles as unknown as StyleRules<Props, ClassKey>;
