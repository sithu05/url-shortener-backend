import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { AccountType, Provider } from '../constants';

@Entity()
export class Account {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 50,
	})
	email: string;

	@Column({
		type: 'text',
		select: false,
	})
	password?: string;

	@Column({
		length: '20',
	})
	uniqueNo: string;

	@Column({
		type: 'enum',
		enum: Provider,
	})
	provider: Provider;

	@Column({
		type: 'enum',
		enum: AccountType,
	})
	accountType: AccountType;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
