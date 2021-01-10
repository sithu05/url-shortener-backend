import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './database.config';

@Module({
	imports: [
		ConfigModule.forFeature(databaseConfig),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const dbConfig: ConfigType<
					typeof databaseConfig
				> = configService.get('database');

				return {
					type: 'mysql',
					host: dbConfig.host,
					port: dbConfig.port,
					username: dbConfig.username,
					password: dbConfig.password,
					database: dbConfig.database,
					autoLoadEntities: true,
					synchronize: true,
				};
			},
			inject: [ConfigService],
		}),
	],
	exports: [],
})
export class DatabaseModule {}
