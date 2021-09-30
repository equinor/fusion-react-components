import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import { DateTimeElement as HTMLDateTimeCustomElement, dateTimeTag } from '@equinor/fusion-wc-date';

export const DateTime = createComponent(React, dateTimeTag, HTMLDateTimeCustomElement);
export { HTMLDateTimeCustomElement };
export default DateTime;
