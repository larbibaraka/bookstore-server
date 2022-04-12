import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
@Injectable()
export class BooksService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly config: ConfigService,
  ) {}

  async getDataTest() {
    const test = await this.elasticsearchService.indices.exists({
      index: this.config.get('ELASTIC_INDEX'),
    });
    console.log('test => ', test);
    return test;
  }

  // get one book with name

  async findOneBook(bookname: string) {
    return {
      book: 'start with why',
    };
  }

  // get all books
  async findAllBooks() {
    // get all books from elastic
    try {
      const { hits } = await this.elasticsearchService.search({
        filter_path: ['hits.hits._source'],
      });
      //delete first element _source
      hits.hits.shift();

      const books = hits.hits.map((book) => {
        return book['_source'];
      });

      return books;
    } catch (error) {
      throw error;
    }
  }
}
