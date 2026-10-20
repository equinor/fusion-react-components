import type { Properties } from 'csstype';

export interface CSSProperties extends Properties {
  [k: string]: unknown | CSSProperties | StyleProperty;
}

const camel2kebab = (x: string) => x.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export type StyleAttribute = { attribute: string; value?: string | number; base?: boolean };

// Type of style(). Previous type caused an error in dependant apps.
// type CSSProperties = Omit<StandardProperties, 'fontSizeAdjust'>;

// biome-ignore lint/suspicious/noExplicitAny: generic default/constraint
export abstract class StyleProperty<T = any, A extends string = string> {
  static makeCssVar(element: string, module: string): string {
    return `--fusion-${element}__${module}`;
  }

  static makeCss(obj: CSSProperties): string {
    return Object.keys(obj)
      .map((x) => `${camel2kebab(x)}: ${obj[x as keyof CSSProperties]}`)
      .join(';');
  }

  static makeVariable({ attribute, value }: StyleAttribute): string {
    return `var(${[attribute, value].filter((x) => !!x).join(',')})`;
  }

  static extractVariables<T extends StyleProperty>(styles: Record<string, T>): string[] {
    return Object.values(styles).reduce(
      (cur, value) => cur.concat(value.variables),
      [] as string[],
    );
  }

  constructor(
    public readonly name: string,
    public readonly value: T,
  ) {}

  abstract get attributes(): Record<A, StyleAttribute>;

  get style(): CSSProperties {
    const { value, attributes } = this;
    return {
      ...value,
      ...(Object.keys(attributes) as A[]).reduce(
        (cur, key) => Object.assign(cur, { [key]: StyleProperty.makeVariable(attributes[key]) }),
        {},
      ),
    };
  }

  get css(): string {
    const { attributes, style } = this;
    return StyleProperty.makeCss({
      ...style,
      ...(Object.keys(attributes) as A[]).reduce(
        (cur, key) => Object.assign(cur, { [key]: StyleProperty.makeVariable(attributes[key]) }),
        {},
      ),
    });
  }

  get variables(): string[] {
    return this.getVariables();
  }

  public getAttributes(include_base?: boolean): StyleAttribute[] {
    return (Object.values(this.attributes) as StyleAttribute[]).filter(
      (x) => include_base || !x.base,
    );
  }

  /**
   * get a attribute as a css variable
   *
   * @example
   * `my-class {
   *    background: ${styles.colors.green.getVariable('color')}
   * }`
   */
  public getVariable(name: A): string {
    return StyleProperty.makeVariable(this.attributes[name]);
  }

  /**
   * return all configured css varibles;
   *
   * @example
   * `:root { ${styles.colors.green.getVariables().join(';')} }`
   */
  public getVariables(include_base?: boolean): string[] {
    return this.getAttributes(include_base).map(({ attribute, value }) =>
      [attribute, value].join(':'),
    );
  }

  public toString(): string {
    return this.css;
  }
}

export default StyleProperty;
