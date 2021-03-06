import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { CreateAccountDto } from './dto/create-account.dto';

import { Account } from './entity/account.entity';

import { AccountType, Provider } from './constants';

@Injectable()
export class AccountsService {
	constructor(
		@InjectRepository(Account)
		private accountsRepository: Repository<Account>,
	) {}

	async create(payload: CreateAccountDto): Promise<Account> {
		const account = new Account();

		account.email = payload.email;
		account.provider = payload.provider;
		account.uniqueNo = payload.uniqueNo;
		account.accountType = payload.accountType;

		if (payload.provider === Provider.LOCAL) {
			const salt = await genSalt(10);

			account.password = await hash(payload.password, salt);
		}

		return this.accountsRepository.save(account);
	}

	async findOneWithPassword(
		email: string,
		accountType: AccountType,
	): Promise<Account> {
		return this.accountsRepository
			.createQueryBuilder('account')
			.where('account.email = :email', { email })
			.andWhere('account.accountType = :type', { type: accountType })
			.addSelect('account.password')
			.getOne();
	}

	async findById(id: number): Promise<Account> {
		return this.accountsRepository.findOne(id);
	}

	// async findOneWithPassword(
	// 	options: FindOneOptions<Account>,
	// ): Promise<Account> {
	// 	return this.accountsRepository.findOne(options);
	// }
}
