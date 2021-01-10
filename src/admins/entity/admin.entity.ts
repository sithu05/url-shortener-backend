import {
	Column,
	CreateDateColumn,
	Entity,
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
		default: true,
	})
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
