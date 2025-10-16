import type { InvalidEvent, EventHandler } from 'react';
import type { TextAreaElement } from '@equinor/fusion-wc-textarea';

// #region Events

export type TextAreaInvalidFn = (validity: ValidityState, el: TextAreaElement) => void;
export type TextAreaInvalidEvent = InvalidEvent<TextAreaElement>;
export type TextAreaInvalidHandler = EventHandler<TextAreaInvalidEvent>;

// #endregion
