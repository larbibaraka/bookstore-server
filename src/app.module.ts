import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
 import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
 
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
