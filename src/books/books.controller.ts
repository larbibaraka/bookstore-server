import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('')
  getAll() {
    return this.bookService.findAllBooks();
  }

  @Get('onebook')
  @UseGuards(JwtGuard)
  getbook() {
    const bookname = 'test';
    return this.bookService.findOneBook(bookname);
  }

 
}
