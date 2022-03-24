import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Paragraph',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['paragraph']),
    },
    variant: {
      disabled: true,
    },
  },
} as Meta;

type Props = Omit<TypographyProps<'paragraph'>, 'ref'>;

export const Component: Story<Props> = (props) => {
  return <Typography {...props}>Typography</Typography>;
};
Component.args = {
  variant: 'paragraph',
  type: 'body_short',
};

export const Overline: Story<Props> = (props) => {
  return (
    <Typography {...props} type="overline">
      Paragraph/Overline
    </Typography>
  );
};
Overline.args = {
  variant: 'paragraph',
};

export const Ingress: Story<Props> = (props) => {
  return (
    <Typography {...props} type="ingress">
      Paragraph/Ingress
    </Typography>
  );
};
Ingress.args = {
  variant: 'paragraph',
};

export const BodyLongLink: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_long_link">
      Paragraph/Body Long Link
    </Typography>
  );
};
BodyLongLink.args = {
  variant: 'paragraph',
};

export const BodyLong: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_long">
      Paragraph/Body Long
    </Typography>
  );
};
BodyLong.args = {
  variant: 'paragraph',
};

export const BodyLongItalic: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_long_italic">
      Paragraph/Body Long Italic
    </Typography>
  );
};
BodyLongItalic.args = {
  variant: 'paragraph',
};

export const BodyLongBold: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_long_bold">
      Paragraph/Body Long Bold
    </Typography>
  );
};
BodyLongBold.args = {
  variant: 'paragraph',
};

export const BodyLongBoldItalic: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_long_bold_italic">
      Paragraph/Body Long Bold Italic
    </Typography>
  );
};
BodyLongBoldItalic.args = {
  variant: 'paragraph',
};

export const BodyShortLink: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_short_link">
      Paragraph/Body Short Link
    </Typography>
  );
};
BodyShortLink.args = {
  variant: 'paragraph',
};

export const BodyShort: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_short">
      Paragraph/Body Short
    </Typography>
  );
};
BodyShort.args = {
  variant: 'paragraph',
};

export const BodyShortItalic: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_short_italic">
      Paragraph/Body Short Italic
    </Typography>
  );
};
BodyShortItalic.args = {
  variant: 'paragraph',
};

export const BodyShortBold: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_short_bold">
      Paragraph/Body Short Bold
    </Typography>
  );
};
BodyShortBold.args = {
  variant: 'paragraph',
};

export const BodyShortBoldItalic: Story<Props> = (props) => {
  return (
    <Typography {...props} type="body_short_bold_italic">
      Paragraph/Body Short Bold Italic
    </Typography>
  );
};
BodyShortBoldItalic.args = {
  variant: 'paragraph',
};

export const Caption: Story<Props> = (props) => {
  return (
    <Typography {...props} type="caption">
      Paragraph/Caption
    </Typography>
  );
};
Caption.args = {
  variant: 'paragraph',
};

export const ParagraphMeta: Story<Props> = (props) => {
  return (
    <Typography {...props} type="meta">
      Paragraph/Meta
    </Typography>
  );
};
ParagraphMeta.storyName = 'Meta';
ParagraphMeta.args = {
  variant: 'paragraph',
};
