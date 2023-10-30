import { Typography } from '@equinor/eds-core-react';

type TitleProps = {
  readonly title: string;
};

export const Title = ({ title }: TitleProps) => {
  return <Typography variant="h4">{title}</Typography>;
};
