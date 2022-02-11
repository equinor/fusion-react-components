export type BreadcrumbProps = {
  breadcrumbs: BreadcrumbItemProps[];
  isFetching: boolean;
  currentLevel?: number;
};

export type BreadcrumbItemProps = {
  link?: string;
  name?: string;
  isActive?: boolean;
};
