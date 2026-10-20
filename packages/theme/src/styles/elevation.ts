import { tokens } from '@equinor/eds-tokens';
import { type StyleAttribute, StyleProperty, type CSSProperties } from '../style-property';

export type ElevationType = keyof typeof tokens.elevation;
export type ElevationAttribute = 'shadow';

export class ElevationStyleProperty extends StyleProperty<string, ElevationAttribute> {
  get attributes(): Record<ElevationAttribute, StyleAttribute> {
    const { name, value } = this;
    const attribute = ElevationStyleProperty.makeCssVar('elevation', name);
    return {
      shadow: { attribute, value },
    };
  }
  get style(): CSSProperties {
    return {
      boxShadow: StyleProperty.makeVariable(this.attributes.shadow),
    };
  }
}

const createStyleProp = (type: ElevationType): ElevationStyleProperty => {
  return new ElevationStyleProperty(type as string, tokens.elevation[type]);
};

const types = Object.keys(tokens.elevation) as ElevationType[];
export const elevation = types.reduce(
  (obj, type) => Object.assign(obj, { [type]: createStyleProp(type) }),
  {} as Record<ElevationType, ElevationStyleProperty>,
);

export const elevationVariables = ElevationStyleProperty.extractVariables(elevation);

export default elevation;
