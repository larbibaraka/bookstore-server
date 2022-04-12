import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('')
  test() {
      this.bookService.getDataTest()
    return { name: 'hello' };
  }
}
