import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from 'src/dto';

import { AuthService } from './auth.service';
import { GoogleGuard } from './guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    console.log('token ', req.user.token);
    const { token } = req.user.token;
    res.redirect('http://localhost:3000/login/succes/' + token);
  }

  @Post('signup')
  signupEmail(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }
}
