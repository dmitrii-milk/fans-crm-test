import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      imports: undefined,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        username: config.get('database.user'),
        host: config.get('database.host'),
        database: config.get('database.database'),
        password: config.get('database.password'),
        port: config.get('database.port'),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
