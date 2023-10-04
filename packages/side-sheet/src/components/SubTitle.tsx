import { Typography } from '@equinor/eds-core-react';

type SubTitleProps = {
  readonly subTitle: string;
};

export const SubTitle = ({ subTitle }: SubTitleProps) => {
  return <Typography variant="meta">{subTitle}</Typography>;
};
