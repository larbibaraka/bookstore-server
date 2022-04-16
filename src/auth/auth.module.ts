import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports : [JwtModule.register({}),   
     ElasticsearchModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      node: configService.get('Elasticsearch_Url'),
      maxRetries: 3,
      requestTimeout: 3000,
      pingTimeout: 3000,
      sniffOnStart: true,
      auth: {
        username: configService.get('ELASTIC_USER'),
        password: configService.get('ELASTIC_PASSWORD'),
      },
    }),
    inject: [ConfigService],
  }),],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [ElasticsearchModule],
})
export class AuthModule {}
