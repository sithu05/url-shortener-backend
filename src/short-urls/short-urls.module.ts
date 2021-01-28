import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortUrl } from './entity/short-url.entity';
import { ShortUrlsController } from './short-urls.controller';
import { ShortUrlsService } from './short-urls.service';

@Module({
	imports: [TypeOrmModule.forFeature([ShortUrl])],
	controllers: [ShortUrlsController],
	providers: [ShortUrlsService],
	exports: [ShortUrlsService],
})
export class ShortUrlsModule {}
