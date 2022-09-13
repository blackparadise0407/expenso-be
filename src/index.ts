import fs from 'fs';
import path from 'path';

import compression from 'compression';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import moduleAlias from 'module-alias';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';

config();
moduleAlias.addAlias('@', __dirname);

import apiRoutes from '@/routes/api.route';

import { dbConnect } from './common/helpers/database';
import { Logger } from './common/helpers/Logger';
import { error, notFound } from './common/middlewares/error.middleware';
import { IS_PROD, ROOT_DIR } from './constants';

if (IS_PROD && !process.env.CORS_ORIGINS) {
  throw new Error('Please set up cors origins before starting the application');
}

const app = express();

const logger = new Logger('App');

app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: (requestOrigins, cb) => {
      const corsOrigins = process.env.CORS_ORIGINS!;
      if (corsOrigins === '*') {
        cb(null, corsOrigins);
        return;
      }
      if (corsOrigins.split(',').indexOf(requestOrigins ?? '') > -1) {
        cb(null, requestOrigins);
        return;
      }
      const error = new Error(
        `Request from origin ${requestOrigins} is not allowed`,
      );
      logger.error(error.message);
      cb(error);
    },
  }),
);

if (IS_PROD) {
  const LOGS_PATH = '.logs';
  if (!fs.existsSync(path.join(ROOT_DIR, LOGS_PATH))) {
    fs.mkdir(path.join(ROOT_DIR, LOGS_PATH), (err) => {
      if (err) {
        logger.error(err.message);
      } else {
        logger.log('Logs directory successfully created');
      }
    });
  }
  const accessLogStream = rfs.createStream('access.log', {
    path: path.join(ROOT_DIR, LOGS_PATH),
    interval: '1d',
  });

  const errorLogStream = rfs.createStream('error.log', {
    path: path.join(ROOT_DIR, LOGS_PATH),
    interval: '1d',
  });

  app.use(
    morgan('common', {
      stream: accessLogStream,
      skip: (_, res) => {
        return res.statusCode >= 400;
      },
    }),
  );
  app.use(
    morgan('combined', {
      stream: errorLogStream,
      skip: (_, res) => {
        return res.statusCode < 400;
      },
    }),
  );
} else {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

// Error handler
app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8080;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      logger.log(`Server started on port ${PORT}`);
    });
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });
