import { TextInputElement } from '@equinor/fusion-wc-textinput';

// #region Events

export type TextInputInvalidFn = (validity: ValidityState, el: TextInputElement) => void;
export type TextInputInvalidEvent = React.InvalidEvent<TextInputElement>;
export type TextInputInvalidHandler = React.EventHandler<TextInputInvalidEvent>;

// #endregion
