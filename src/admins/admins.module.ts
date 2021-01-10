import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entity/admin.entity';
import { AdminsService } from './admins.service';

@Module({
	imports: [TypeOrmModule.forFeature([Admin])],
	providers: [AdminsService],
	exports: [AdminsService],
})
export class AdminsModule {}
