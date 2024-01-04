import type { ObservableInput, Observable } from 'rxjs';

export type RlsMappingType =
  | 'Unknown'
  | 'AdGroup'
  | 'ProjectMembership'
  | 'AdvancedProjectMembership'
  | 'ContractMembership'
  | 'Positions';
export type RlsNotFoundMode = 'UserEmail' | 'Null';

export type RlsDelimiter = ';' | '|';

export type RlsMatch = 'Unkown' | 'All' | 'Any';

export type RlsUserTypes = 'Unknown' | 'PermanentEmployee' | 'ExtHire' | 'Consultant' | 'External';

export type RlsMemberShipRequirementType = 'Unknown' | 'Department' | 'AdGroup' | 'DomainMembership' | 'Account';

export type AccessITRole = {
  id: string;
  name: string | null;
  url: string | null;
};

export type RlsAdGroupMapping = {
  groupId: string;
  groupName: string | null;
  identityName: string | null;
};

export type WorkspaceRole = {
  requireMembership: boolean;
  level: string | null;
};

export type RlsGlobalAccessRequirement = {
  accessIT: AccessITRole | null;
  workspace: WorkspaceRole | null;
};

export type RlsIdentityConfiguration = {
  mappingType: RlsMappingType;
  notFoundMode: RlsNotFoundMode;
  delimiter: RlsDelimiter | null;
  nameSelector: string | null;
  adGroupMapping?: RlsAdGroupMapping[] | null;
  projectMembershipConfig?: RlsIdentityProjectMembershipConfig;
};

export type RlsIdentityProjectMembershipConfig = {
  match: RlsMatch;
  conditions: RlsCondition[] | null;
};

export type RlsCondition = {
  displayName: string;
  role?: string | null;
  obs?: string | null;
  pmt?: boolean | null;
  basePositions?: BasePositionCondition[] | null;
  disciplines?: string[] | null;
  userTypes?: RlsUserTypes[] | null;
};

export type BasePositionCondition = {
  id: string;
  name: string | null;
};

export type RlsRoleConfiguration = {
  name: string | null;
  description: string | null;
  pbiName: string | null;
  isAdminRole: boolean;
  membership: RlsRoleMembershipRequirement[] | null;
};

export type RlsRoleMembershipRequirement = {
  type: RlsMemberShipRequirementType;
  identifiers: string[] | null;
  userTypes: RlsUserTypes[] | null;
  allowExternals: boolean;
  adGroups?: RlsAdGroup[] | null;
  domainConfig?: RlsRoleDomainMembershipConfig;
};

export type RlsAdGroup = {
  id: string;
  name: string | null;
};

export type RlsRoleDomainMembershipConfig = {
  requiredPositionObs: string[] | null;
};

export type RlsConfiguration = {
  version: number;
  globalAccessRequirement: RlsGlobalAccessRequirement | null;
  identity: RlsIdentityConfiguration | null;
  roles: RlsRoleConfiguration[] | null;
};

export type AccessToken = {
  expirationUtc: Date;
  token: string;
};

export type EmbedConfig = {
  embedType: 'Report' | 'Dashboard';
  embedUrl: string;
  tokenType: 'AAD' | 'Embed';
  name?: string;
  dashboardId?: string;
  datasetId?: string;
  groupId?: string;
  reportId?: string;
  tileId?: string;
  rlsConfiguration?: RlsConfiguration | null;
  contrastMode?: number;
};

export type EmbedInfo = {
  type: 'PowerBI';
  embedConfig: EmbedConfig;
};

export type Person = {
  id: string;
  isAffiliateAccess: boolean;
};

export type Report = {
  id: string;
  title: string;
  globalIdentifier?: string | null;
  ownedBy: Person | null;
  publishedBy?: Person;
  userTargetGroup: string;
  dataRefreshRate: string;
  dateCreatedUtc: Date | null;
  dateModifiedUtc: Date | null;
  datePublishedUtc: Date | null;
  dataSources: string;
  access: string;
  allowExternalUsers: boolean;
  allowOnlyEmployees: boolean;
  denyExtHire: boolean;
  isPublished: boolean;
  isEmbedOnly: boolean;
  securityRequirementCheck: 'any' | 'all';
  securityRequirements?: {
    id: string;
    type: 'discipline' | 'contract';
    value: string;
  }[];
  reportType: 'Incomplete' | 'Generic' | 'Shared' | 'Personal' | 'EmbedOnly' | null;
  isEditable?: boolean;
};
// TODO - add required props for using context
type Context = unknown;

export class ApiClientError extends Error {
  static TYPE = 'unauthorized';
  #type: typeof ApiClientError.TYPE;

  get type(){
    return this.#type;
  }
  constructor(type: typeof ApiClientError.TYPE) {
    super('');
    this.#type = type;
  }
}


export type ApiClient = {
  acquireAccessToken(reportId: string): ObservableInput<AccessToken>;
  checkContextAccess(reportId: string, contextExternalId: string, contextType: string): ObservableInput<void>;
  getEmbedInfo(reportId: string): ObservableInput<EmbedInfo>;
  getReport(reportId: string): ObservableInput<Report>;
  getReportDescription(reportId: string): ObservableInput<string>;
  getReportAccessDescription(reportId: string): ObservableInput<string>;
  getReportRequirements(reportId: string): ObservableInput<string>;
  context?: {
    currentContext: Observable<Context>;
  }
  processError(err: unknown): { header: string; subHeader: string };
};


// PBI-Common