import type { TextAreaElement } from '@equinor/fusion-wc-textarea';

// #region Events

export type TextAreaInvalidFn = (validity: ValidityState, el: TextAreaElement) => void;
export type TextAreaInvalidEvent = React.InvalidEvent<TextAreaElement>;
export type TextAreaInvalidHandler = React.EventHandler<TextAreaInvalidEvent>;

// #endregion
