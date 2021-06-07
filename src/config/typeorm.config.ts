import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'keychron',
  // entities: [__dirname + '/../**/*.entity.ts'],
  autoLoadEntities: true,
  synchronize: true
}