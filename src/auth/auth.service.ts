import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/dto';
import * as argon from 'argon2';
import { throwError } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private elasticService: ElasticsearchService,
  ) {}

  async signup({ email, password }: AuthDto) {
    try {
      // search if the user exist in our db(elastic)
      const { count } = await this.elasticService.count({
        query: {
          match_phrase_prefix: {
            email: email,
          },
        },
      });
      console.log('email ', count);
      if (count > 0) {
        return {
          success: false,
          message: 'Credentials taken',
        };
      }

      // if not create user in index appUsers
      const hash = await argon.hash(password);
      //  save on db
      const result = await this.elasticService.index({
        index: 'appusers',
        body: {
          email,
          password: hash,
        },
      });
      console.log('result : ', result);

      // return the JWT of the user
      return this.signToken(result._id, email);
    } catch (error) {
      throwError;
    }
  }

  async signToken(userId: string, email: string): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      token: token,
    };
  }
}
