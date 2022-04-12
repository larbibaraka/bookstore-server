import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
@Injectable()
export class BooksService {
  constructor(private readonly elasticsearchService: ElasticsearchService, private readonly config: ConfigService) {}

  async getDataTest() {
    const test = await this.elasticsearchService.indices.exists({
      index: this.config.get('ELASTIC_INDEX'),
    });
    console.log('test => ', test)
      return test;
  }
}
