import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { UserDocument } from "../users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.generateTokens(user);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    return this.generateTokens(user);
  }

  private async generateTokens(user: UserDocument) {
    const payload = { sub: user._id, email: user.email, role: user.role };

    const accessSecret =
      this.configService.get<string>("jwt.accessSecret") ||
      this.configService.get<string>("JWT_ACCESS_SECRET") ||
      "super_secret_jwt_access_key";
    const accessExpiration =
      this.configService.get<string>("jwt.accessExpiration") ||
      this.configService.get<string>("JWT_ACCESS_EXPIRATION") ||
      "15m";

    const refreshSecret =
      this.configService.get<string>("jwt.refreshSecret") ||
      this.configService.get<string>("JWT_REFRESH_SECRET") ||
      "super_secret_jwt_refresh_key";
    const refreshExpiration =
      this.configService.get<string>("jwt.refreshExpiration") ||
      this.configService.get<string>("JWT_REFRESH_EXPIRATION") ||
      "7d";

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
        expiresIn: accessExpiration,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: refreshExpiration,
      }),
    ]);

    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.usersService.updateHashedRefreshToken(
      user._id.toString(),
      hashedRefreshToken,
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  googleLogin(req: any) {
    if (!req.user) {
      return "No user from google";
    }
    return this.generateTokens(req.user);
  }
}
