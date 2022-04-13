import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt = req.user.jwt;
    res.redirect('http://localhost:3000/login/succes/' + jwt);
  }

}

