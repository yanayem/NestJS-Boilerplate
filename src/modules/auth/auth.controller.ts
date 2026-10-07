import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { JwtRefreshGuard } from "../../common/guards/jwt-refresh.guard";
import { GoogleAuthGuard } from "../../common/guards/google-auth.guard";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login user and get tokens' })
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @UseGuards(JwtRefreshGuard)
  @Post("refresh")
  refreshTokens(@Request() req, @Body() refreshTokenDto: RefreshTokenDto) {
    const userId = req.user._id;
    return this.authService.refreshTokens(userId, refreshTokenDto.refreshToken);
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    // Initiates the Google OAuth flow
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
