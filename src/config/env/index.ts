import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: string | number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  jwtSecret: string;
  jwtExpired: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 5000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'fullerton',
  },
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  jwtExpired: process.env.JWT_EXPIRED || '6h',
};

const production: IConfig = {
  port: process.env.PORT || 5000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'fullerton',
  },
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  jwtExpired: process.env.JWT_EXPIRED || '6h',
};

const test: IConfig = {
  port: process.env.PORT || 5000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'fullerton',
  },
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  jwtExpired: process.env.JWT_EXPIRED || '6h',
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production,
};

export default config[NODE_ENV];
