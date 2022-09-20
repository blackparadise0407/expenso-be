import { RequestHandler } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

import { ENV } from '@/constants';

import { ForbiddenException } from '../exceptions/ForbiddenException';

export const checkJwt = auth({
  audience: ENV.AUDIENCE,
  issuerBaseURL: ENV.ISSUER_BASE_URL,
});

export const checkPermissions =
  (permissions: string | string[]): RequestHandler =>
  (req, _, next) => {
    const perms = (req.auth?.payload.permissions ?? []) as string[];
    if (
      perms.some((perm) =>
        (typeof permissions === 'string'
          ? [permissions]
          : permissions
        ).includes(perm),
      )
    ) {
      next();
    } else {
      next(new ForbiddenException());
    }
  };
