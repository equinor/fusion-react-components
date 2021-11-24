import { MemoExoticComponent } from 'react';
/** Standard column object */
export type Col<T> = {
  key: string;
  data: T[];
};
/** All the data needed about a specific Garden for the Virtual Garden component */
export type GardenData<TPackage extends object, TColumn extends Col<TPackage>> = {
  /** The columns object */
  columns: TColumn[];

  /** How wide you want the packages to be */
  itemWidth: number;

  /** Specific package when the user clicks on it */
  selectedPkg: TPackage | null;

  /** Column that is to be highlighted */
  hightlightColumn: string | null;
};

/** Click handlers in the Garden */
export type GardenHandlers<TPackage extends object> = {
  onPackageClick: (selectedPkg: TPackage) => void;
};

/**Arguments/Props for the Package component passed to the
 * Garden component and rendered inside the Virtualized Garden Component */
export type PackageArgs<T extends object> = {
  /** Package item */
  item: T;

  /** Width of the items */
  width: number;

  /** Click handler when clicking on a package */
  onPackageClick: (selectedPkg: T) => void;

  /** The package a user clicks on */
  selectedPkg: T | null;

  /** Key of a certain column. Used to check if column is expanded */
  columnKey: string;

  /** All other props. @todo: Can this be typed better? */
  [x: string]: unknown;
};

/** Arguments/props for the Header component passed to the Garden component */
export type HeaderArgs<TPackages extends object, TColumn extends Col<TPackages>, TFilter extends object> = {
  /** Key for a specific header. Used to display some data */
  headerKey: string | undefined;

  /** All columns in the garden */
  columns: TColumn[];

  /** Filterterms */
  filterTerms: TFilter[];
};

/** Custom properties that can be passed to either header or package component */
export type CustomComponentProps = Record<string | number, unknown>;

/** Type for the header object passed to the Garden component */
export type GardenHeader<TPackage extends object, TFilter extends object, TColumn extends Col<TPackage>> = {
  /** The header component. Wrap this component inside memo.  */
  component: MemoExoticComponent<(args: HeaderArgs<TPackage, TColumn, TFilter>) => JSX.Element>;

  /** Additional props passed to the header component */
  customHeaderProps?: CustomComponentProps;

  /** Additional styling or attributes added to the header container */
  customHeaderStyling?: JSX.IntrinsicElements['div'];
};

/** Type for the package object passed to the Garden component */
export type GardenPackage<TPackage extends object> = {
  /** The package component. Wrap this component inside memo */
  component: MemoExoticComponent<(args: PackageArgs<TPackage>) => JSX.Element>;

  /** Additional props passed to the package component */
  customPackageProps?: CustomComponentProps;
};

/** Properties for the main Garden component */
export type GardenProps<TPackage extends object, TFilter extends object, TColumn extends Col<TPackage>> = {
  /** All data related to a garden */
  gardenData: GardenData<TPackage, TColumn>;

  /** Click handlers */
  handlers: GardenHandlers<TPackage>;

  /** Filter terms */
  filterTerms: TFilter[];

  /** Header component and additional properties and styling */
  gardenHeader: GardenHeader<TPackage, TFilter, TColumn>;

  /** Package component and additinoal properties */
  gardenPackage: GardenPackage<TPackage>;
};
