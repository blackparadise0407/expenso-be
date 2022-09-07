import { connect } from 'mongoose';

import { ENV } from '@/constants';

import { Logger } from './Logger';

export const dbConnect = async () => {
  const logger = new Logger('Database');
  return new Promise((resolve, reject) => {
    connect(ENV.DB_URI as string, {
      autoIndex: true,
    })
      .then(() => {
        logger.log('Successfully established a connection to the database');
        resolve(true);
      })
      .catch(reject);
  });
};
