import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AccountsModule } from 'src/accounts/accounts.module';
import { AdminsModule } from 'src/admins/admins.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [AdminsModule, AccountsModule, PassportModule],
	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
