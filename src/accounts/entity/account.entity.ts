import { Admin } from 'src/admins/entity/admin.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
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

	@ManyToOne(() => Admin, (admin) => admin.accounts)
	@JoinColumn({
		name: 'uniqueNo',
		referencedColumnName: 'uniqueNo',
	})
	admin?: Admin;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
