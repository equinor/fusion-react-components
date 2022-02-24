export type BreadcrumbProps = {
  breadcrumbs: BreadcrumbItemProps[];
  isFetching: boolean;
  currentLevel?: number;
  hasHoverColor?: boolean;
};

export type BreadcrumbItemProps = {
  onClick?: () => void;
  name?: string;
  isActive?: boolean;
  hasHoverColor?: boolean;
};
