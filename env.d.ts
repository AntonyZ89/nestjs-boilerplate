declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      DB_TYPE: string;
      DB_PORT: string | number;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_NAME: string;

      DB_TEST_NAME: string;

      JWT_SECRET: string;
      JWT_EXPIRE_IN: string;

      PORT?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
