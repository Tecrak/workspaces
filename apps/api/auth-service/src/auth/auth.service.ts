import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthValues, SignInData } from '@repo/types';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type AuthResult = { accesToken: string; userId: string; userEmail: string };

@Injectable()
export class AuthService {
  constructor(
    private userServive: UserService,
    private JwtService: JwtService,
  ) {}

  async authenticate(input: AuthValues): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthValues): Promise<SignInData | null> {
    const user = await this.userServive.findByEmail(input.email); // взяти дані що приповзуть

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) return null;

    return {
      id: user.id,
      email: user.email,
    };
  }
  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id, // subject
      email: user.email,
    };

    const accesToken = await this.JwtService.signAsync(tokenPayload);

    return { accesToken, userEmail: user.email, userId: user.id };
  }
}
