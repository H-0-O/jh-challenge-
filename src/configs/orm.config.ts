import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default {
  entities: [
    './dist/modules/**/entities/*.js',
    './dist/modules/**/*.entity.js',
  ],
  entitiesTs: [
    './src/modules/**/entities/*.ts',
    './src/modules/**/*.entity.ts',
  ],
  driver: PostgreSqlDriver,
  //TODO read this configs from env
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  dbName: 'nj-challenge',
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
    glob: '!(*.d).{js,ts}',
  },
  seeder: {
    path: './dist/database/seeders',
    pathTs: './src/database/seeders',
    defaultSeeder: 'DatabaseSeeder',
    emit: 'ts',
    glob: '!(*.d).{js,ts}',
    fileName: (className: string) => className,
  },
  debug: true,
} as MikroOrmModuleSyncOptions;
