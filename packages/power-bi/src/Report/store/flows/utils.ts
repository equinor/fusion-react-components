import type { AccessToken } from '../types';

const MINUTES_BEFORE_EXPIRATION = 1;
const REFRESH_OFFSET = MINUTES_BEFORE_EXPIRATION * 60 * 1000;

export const accessTokenExpireTime = (token: AccessToken, offset: number = REFRESH_OFFSET): number => {
  const expires = token.expirationUtc.getTime();
  const now = new Date(Date.now()).getTime();
  return expires - now - offset;
};

export const shouldUpdateToken = (token: AccessToken, offset: number = REFRESH_OFFSET) =>
  accessTokenExpireTime(token, offset) <= 0;
