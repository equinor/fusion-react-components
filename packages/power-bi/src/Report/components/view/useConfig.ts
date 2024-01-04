import { useContext, useMemo } from 'react';

import { IEmbedConfiguration } from 'powerbi-client';

import deepmerge from 'deepmerge';

import { useObservableState, useObservableSelector } from '@equinor/fusion-observable/react';
import { context } from '../../context';
import { createConfig } from './embed-config';

export const useConfig = (options: IEmbedConfiguration = {}) => {
  const { store } = useContext(context);
  const { value: embedInfo } = useObservableState(useObservableSelector(store, 'embedInfo'));
  const { value: token } = useObservableState(useObservableSelector(store, 'token'));
  const config = useMemo(() => embedInfo && createConfig(embedInfo), [embedInfo]);
  const embedConfig = useMemo<IEmbedConfiguration | void>(() => {
    if (config && token) {
      return { ...deepmerge(config, options), accessToken: token.token } satisfies IEmbedConfiguration;
    }
  }, [config, options, token]);
  return embedConfig;
};

export default useConfig;
