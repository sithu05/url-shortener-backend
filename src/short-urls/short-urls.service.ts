import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { generateCode } from '../utils/misc';
import { ShortUrl } from './entity/short-url.entity';

@Injectable()
export class ShortUrlsService {
	constructor(
		@InjectRepository(ShortUrl)
		private shortUrlsRepository: Repository<ShortUrl>,
	) {}

	async create({ url, expiry }: CreateShortUrlDto): Promise<ShortUrl> {
		const shortUrl = new ShortUrl();

		shortUrl.url = url;
		shortUrl.codes = generateCode(8);
		shortUrl.duration = expiry || 0;
		shortUrl.count = 0;

		return this.shortUrlsRepository.save(shortUrl);
	}

	async findBySlug(slug: string): Promise<ShortUrl> {
		const shortUrl = await this.shortUrlsRepository.findOne({
			codes: slug,
		});

		if (!shortUrl) {
			throw new NotFoundException();
		}

		shortUrl.count++;
		// will add expiry logic

		return this.shortUrlsRepository.save(shortUrl);
	}
}
