import { connect } from 'mongoose';

import { ENV } from '@/constants';

export const dbConnect = async () => {
  return new Promise((resolve, reject) => {
    connect(ENV.DB_URI as string, {
      autoIndex: true,
    })
      .then(() => {
        console.log('Successfully established a connection to the database');
        resolve(true);
      })
      .catch(reject);
  });
};
