import { Options } from '@mikro-orm/core';

type ConfigCallback = { database: Options };
export default (): ConfigCallback => ({
  database: {
    type: 'postgresql',
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    dbName: process.env.DATABASE_DATABASE as string,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
  },
});
