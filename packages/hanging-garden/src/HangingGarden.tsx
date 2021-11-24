import { useEffect, useState } from 'react';
import { VirtualGarden } from './VirtualGarden/VirtualGarden';
import { Col, GardenProps } from './models/VirtualGarden';
import { ExpandProvider } from './providers/ExpandProvider';

/**
 * Main Garden component used inside apps.
 * Will render a garden based on the properties passed.
 */
export const HangingGarden = <TPackage extends object, TFilter extends object, TColumn extends Col<TPackage>>(
  props: GardenProps<TPackage, TFilter, TColumn>
) => {
  const [widths, setWidths] = useState<number[]>([]);

  const { filterTerms, gardenData, handlers, gardenPackage, gardenHeader } = props;

  /** Dynamic widths */
  useEffect(() => {
    setWidths(new Array(gardenData.columns.length).fill(gardenData.itemWidth));
  }, [gardenData.columns, gardenData.itemWidth]);

  // Dont want to render if no columns..
  //TODO: check if there are some issues in the useGardenData hooks in parent
  if (widths.length !== gardenData.columns.length) {
    return <h1>widths and columncount not equal</h1>;
  }

  if (widths.length === 0) {
    return <h1>widhts is 0</h1>;
  }

  return (
    <ExpandProvider initialWidths={widths}>
      <VirtualGarden<TPackage, TFilter, TColumn>
        filterTerms={filterTerms}
        gardenData={gardenData}
        handlers={handlers}
        gardenHeader={gardenHeader}
        gardenPackage={gardenPackage}
      />
    </ExpandProvider>
  );
};

export default HangingGarden;
