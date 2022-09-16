import { FusionTheme } from '@equinor/fusion-react-styles';

export type TypographyType = FusionTheme['typography'];
export type TypographyPropertiesType<K extends keyof TypographyType> = TypographyType[K];

export type TypographyHeadingType = TypographyPropertiesType<'heading'>;
