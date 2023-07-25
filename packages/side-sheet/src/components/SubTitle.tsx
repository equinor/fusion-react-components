import { Typography } from '@equinor/eds-core-react';

type SubTitleProps = {
  subTitle: string;
};

export const SubTitle = ({ subTitle }: SubTitleProps) => {
  return <Typography variant="meta">{subTitle}</Typography>;
};
