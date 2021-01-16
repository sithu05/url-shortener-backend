import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUniqueNo } from 'src/utils/misc';
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
		const admin = new Admin();

		const lastest = await this.adminsRepository
			.createQueryBuilder('admin')
			.orderBy('admin.createdAt', 'DESC')
			.getOne();

		admin.firstName = payload.firstName;
		admin.lastName = payload.lastName;
		admin.uniqueNo = generateUniqueNo(lastest?.uniqueNo, 'A');

		return this.adminsRepository.save(admin);
	}

	async findByUniqueNo(uniqueNo: string): Promise<Admin> {
		return this.adminsRepository.findOne(
			{ uniqueNo },
			{ relations: ['accounts'] },
		);
	}

	async getCounts(): Promise<number> {
		return this.adminsRepository.count({});
	}
}
