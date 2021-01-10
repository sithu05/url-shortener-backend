import { IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
	@IsString()
	firstName: string;

	@IsOptional()
	@IsString()
	lastName: string;
}
