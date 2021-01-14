import { Injectable, OnModuleInit } from '@nestjs/common';

import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthService implements OnModuleInit {
	constructor(private readonly adminsService: AdminsService) {}

	async onModuleInit(): Promise<void> {
		const adminsCount = await this.adminsService.getCounts();

		if (adminsCount === 0) {
			console.log('will seed data');
		}
	}
}
