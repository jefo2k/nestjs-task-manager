import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: ["error"] // "query", "error"
}