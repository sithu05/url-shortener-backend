import { IsOptional, IsPositive, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
	@IsUrl()
	url: string;

	@IsOptional()
	@IsPositive()
	expiry?: number;
}
