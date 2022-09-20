import { RequestHandler } from 'express';
import qs from 'query-string';

export const queryParser = (): RequestHandler => (req, _, next) => {
  if (req.query) {
    req.query = qs.parse(qs.stringify(req.query), {
      arrayFormat: 'comma',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  }
  next();
};
