import { auth } from 'express-oauth2-jwt-bearer';

import { ENV } from '@/constants';

export const checkJwt = auth({
  audience: ENV.AUDIENCE,
  issuerBaseURL: ENV.ISSUER_BASE_URL,
});
