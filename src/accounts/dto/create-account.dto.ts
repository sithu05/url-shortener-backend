import { IsEmail, IsEnum, IsString } from 'class-validator';

import { AccountType, Provider } from '../constants';

export class CreateAccountDto {
	@IsEmail()
	email: string;

	@IsString()
	password?: string;

	@IsEnum(Provider)
	provider: Provider;

	@IsEnum(AccountType)
	accountType: AccountType;

	@IsString()
	uniqueNo: string;
}
