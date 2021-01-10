import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

import { Admin } from './entity/admin.entity';

@Injectable()
export class AdminsService {
	constructor(
		@InjectRepository(Admin)
		private adminsRepository: Repository<Admin>,
	) {}

	async create(payload: CreateAdminDto): Promise<Admin> {
		return this.adminsRepository.create(payload);
	}
}
