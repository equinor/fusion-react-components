import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import { DateRangeElement as HTMLDateRangeCustomElement, dateRangeTag } from '@equinor/fusion-wc-date';

export const DateRange = createComponent(React, dateRangeTag, HTMLDateRangeCustomElement);
export { HTMLDateRangeCustomElement };
export default DateRange;
