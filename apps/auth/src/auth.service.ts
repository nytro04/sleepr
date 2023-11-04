import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    try {
      const tokenPayload: TokenPayload = {
        userId: user._id.toHexString(),
      };

      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION')),
      );

      const token = this.jwtService.sign(tokenPayload);

      response.cookie('Authentication', token, {
        httpOnly: true,
        expires,
      });

      return token;
    } catch (error) {
      Logger.log(error, 'login error');
    }
  }
}
