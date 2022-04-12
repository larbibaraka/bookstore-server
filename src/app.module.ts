import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BooksModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}
