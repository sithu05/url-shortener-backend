import { Account } from 'src/accounts/entity/account.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 50,
	})
	firstName: string;

	@Column({
		length: 50,
	})
	lastName?: string;

	@Column({
		length: 20,
		unique: true,
	})
	uniqueNo: string;

	@OneToMany(() => Account, (account) => account.admin)
	accounts: Account[];

	@Column({
		default: true,
	})
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
