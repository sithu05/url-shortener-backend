import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';

import { Account } from 'src/accounts/entity/account.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email',
			passReqToCallback: true,
		});
	}

	async validate(req: Request): Promise<Account> {
		const { email, password, accountType } = req.body;

		const account = await this.authService.validateUser(
			email,
			password,
			accountType,
		);

		if (!account) {
			throw new UnauthorizedException();
		}

		return account;
	}
}
