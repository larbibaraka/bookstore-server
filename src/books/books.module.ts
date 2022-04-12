import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { BooksService } from './books.service';
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('Elasticsearch_Url'),
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
        auth: {
          username: configService.get('ELASTIC_USER'),
          password: configService.get('ELASTIC_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BooksService], 
  exports: [ElasticsearchModule],
})
export class BooksModule {}
