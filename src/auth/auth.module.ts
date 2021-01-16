import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AccountsModule } from 'src/accounts/accounts.module';
import { AdminsModule } from 'src/admins/admins.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import jwtConfig from './jwt.config';

@Module({
	imports: [
		ConfigModule.forFeature(jwtConfig),

		AdminsModule,
		AccountsModule,
		PassportModule,

		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const jwt: ConfigType<typeof jwtConfig> = configService.get(
					'jwt',
				);

				return {
					secret: jwt.secret,
					signOptions: {
						expiresIn: jwt.expiresIn,
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
