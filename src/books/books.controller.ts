import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('')
  getAll() {
    return this.bookService.findAllBooks();
  }

  @Get('onebook')
  getbook() {
    const bookname = 'test';
    return this.bookService.findOneBook(bookname);
  }

 
}
