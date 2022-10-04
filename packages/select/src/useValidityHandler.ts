import { useCallback } from 'react';
import { TextInputElement } from '@equinor/fusion-wc-select';

export const useValidityHandler = (fn: TextInputInvalidFn): TextInputInvalidHandler =>
  useCallback(
    (e: TextInputInvalidEvent) => {
      if (e.target instanceof TextInputElement) {
        fn(e.target.validity, e.target);
      }
    },
    [fn]
  );
