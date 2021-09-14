import { IconButton, OpenInNewIcon, useTooltipRef } from '@equinor/fusion-components';
import { CellProps } from '@equinor/fusion-react-table';
import { useCallback } from 'react';
/**
 * A component used when assigning the `Cell` property a value inside a `Column` object.
 * 
 * @param props contains all the CellProps, including content and url which are accessed from the accessor property from the `Column` object.
 * @returns A `JSX.Element` containing a clickable icon and anchor tag with values from `props`.
 * @example ```typescript
 * const columns: Column<HandoverMcpkg>[] = [
 *      {
 *          id: "timPkg",
 *          Header: "Mc.Pkg",
 *          accessor: ({mcPkgNo, url}) => ({content: mcPkgNo, url: url}),
 *          Cell: CellWithLink
 *      }
 * ]
 * ```
 */
export const CellWithLink = <T extends object>(
    props: CellProps<T, { content: string; url: string }>
) => {
    const {
        value: { content, url },
    } = props;

    const handleOnClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            window.open(url);
        },
        [url]
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href={url} onClick={(e) => handleOnClick(e)}>
                {content}
            </a>
            <IconButton onClick={(e) => handleOnClick(e)} ref={useTooltipRef('Open in ProCoSys')}>
                <OpenInNewIcon />
            </IconButton>
        </div>
    );
};

