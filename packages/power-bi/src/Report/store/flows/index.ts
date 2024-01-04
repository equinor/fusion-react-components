import type { ApiClient } from '../../../types';
import type { StoreFlow } from '../types';

import createAccessTokenUpdateFlow from './access-token-periodic-updater';
import createContextAccessFlow from './check-context-access';
import createEmbedInfoFlow from './fetch-embed-info';
import onTokenAcquiredFlow from './on-token-acquired';
import onWindowActivatedFlow from './on-window-activated';
import createRequestAccessTokenFlow from './request-access-token';

export const flows = (args: { apiClient: ApiClient }): Array<StoreFlow> => [
  createAccessTokenUpdateFlow(),
  createContextAccessFlow(args.apiClient),
  createEmbedInfoFlow(args.apiClient),
  onTokenAcquiredFlow,
  onWindowActivatedFlow,
  createRequestAccessTokenFlow(args.apiClient),
];

export default flows;
