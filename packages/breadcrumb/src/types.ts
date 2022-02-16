export type BreadcrumbProps = {
  breadcrumbs: BreadcrumbItemProps[];
  isFetching: boolean;
  currentLevel?: number;
  hasHoverColor?: boolean;
};

export type BreadcrumbItemProps = {
  link?: string;
  name?: string;
  isActive?: boolean;
};
