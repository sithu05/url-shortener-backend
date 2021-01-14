import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entity/account.entity';
import { AccountsService } from './accounts.service';

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
	providers: [AccountsService],
	exports: [AccountsService],
})
export class AccountsModule {}
