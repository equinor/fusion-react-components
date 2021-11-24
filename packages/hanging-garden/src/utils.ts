type PackageWithDescription<T extends object> = T & {
  description: string;
};
/** Type guard for a package object checking whether or not it contains a description property */
function packageHasDescription<T extends object>(packageObj: T): packageObj is PackageWithDescription<T> {
  if ((packageObj as PackageWithDescription<T>).description) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function for extracting the longest description of packages inside one column
 * @param columnData One column from the garden
 * @returns Longest description string
 */
export const getLongestDescription = <T extends object>(columnData: T[]) => {
  let longest = '';

  columnData.forEach((e: T) =>
    packageHasDescription(e) && e.description.length > longest.length ? (longest = e.description) : null
  );
  return longest;
};
/**
 * Function for estimating the extra width it takes to display the descriptions of packages.
 * @param columnData One column from the garden
 * @returns A calculated width based on string length and font
 */
export const getDescriptionWidth = <T extends object>(columnData: T[]): number => {
  const longestDescription = getLongestDescription(columnData);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx!.font = '16px Equinor, sans-serif';
  const width = ctx!.measureText(longestDescription).width;
  return width;
};

export function cancelTimeout(handle: { id: number | null }) {
  handle && handle.id && cancelAnimationFrame(handle.id);
}
export function requestTimeout(fn: () => void, delay: number) {
  const start = Date.now();

  function loop() {
    if (Date.now() - start >= delay) {
      fn.call(null);
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  }
  const handle = {
    id: requestAnimationFrame(loop),
  };

  return handle;
}
