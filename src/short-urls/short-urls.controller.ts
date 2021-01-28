import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

import { ShortUrlsService } from './short-urls.service';

@Controller('short_urls')
export class ShortUrlsController {
	constructor(private readonly shortUrlsService: ShortUrlsService) {}

	@Post()
	async create(@Body() payload: CreateShortUrlDto) {
		return this.shortUrlsService.create(payload);
	}

	@Get(':slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.shortUrlsService.findBySlug(slug);
	}
}
