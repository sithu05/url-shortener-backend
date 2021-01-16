import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { AccountsService } from 'src/accounts/accounts.service';
import { AdminsService } from 'src/admins/admins.service';

import { AccountType, Provider } from 'src/accounts/constants';

import { Account } from 'src/accounts/entity/account.entity';

@Injectable()
export class AuthService implements OnModuleInit {
	constructor(
		private readonly adminsService: AdminsService,
		private readonly accountsService: AccountsService,
		private readonly jwtService: JwtService,
	) {}

	async onModuleInit(): Promise<void> {
		const adminsCount = await this.adminsService.getCounts();

		if (adminsCount === 0) {
			const admin = await this.adminsService.create({
				firstName: 'Administrator',
				lastName: '',
			});

			// create account for admin
			await this.accountsService.create({
				email: 'admin@admin.com',
				password: '12345678',
				uniqueNo: admin.uniqueNo,
				provider: Provider.LOCAL,
				accountType: AccountType.ADMIN,
			});
		}
	}

	async validateUser(
		email: string,
		password: string,
		accountType: AccountType,
	): Promise<Account> {
		const account = await this.accountsService.findOneWithPassword(
			email,
			accountType,
		);

		if (!account) {
			return null;
		}

		const isEqual = await compare(password, account.password);

		if (!isEqual) {
			throw new BadRequestException('Password or email is incorrect');
		}

		return account;
	}

	async getProfile(accountId: number, uniqueNo: string) {
		return this.adminsService.findByUniqueNo(uniqueNo);
	}

	generateToken(account: Account): string {
		return this.jwtService.sign({
			accountId: account.id,
			uniqueNo: account.uniqueNo,
		});
	}
}
