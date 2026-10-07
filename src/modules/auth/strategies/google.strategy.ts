import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID:
        configService.get<string>("google.clientID") || "default_client_id",
      clientSecret:
        configService.get<string>("google.clientSecret") ||
        "default_client_secret",
      callbackURL:
        configService.get<string>("google.callbackURL") ||
        "http://localhost:3000/api/v1/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const userEmail = emails[0].value;

    let user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      // Create user if not exists
      user = await this.usersService.create({
        email: userEmail,
        name: name.givenName + " " + name.familyName,
        // Since it's OAuth, we might create a random password or leave it optional
      } as any);
    }

    done(null, user);
  }
}
