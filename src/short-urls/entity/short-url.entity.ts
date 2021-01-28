import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ShortUrl {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'text',
	})
	url: string;

	@Column({
		length: 8,
	})
	codes: string;

	@Column({
		default: 0,
	})
	count: number;

	@Column({
		default: 0,
	})
	duration: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
