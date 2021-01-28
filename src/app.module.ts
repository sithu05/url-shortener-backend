import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';

import { DatabaseModule } from './database/database.module';
import { AdminsModule } from './admins/admins.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ShortUrlsModule } from './short-urls/short-urls.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
		}),

		DatabaseModule,
		AdminsModule,
		AccountsModule,
		AuthModule,
		ShortUrlsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
