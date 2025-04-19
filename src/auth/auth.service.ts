import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import axios from 'axios';

@Injectable()
export class AuthService {

  async loginWithKeycloak({ username, password }: LoginDto) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'nestjs-api');
    params.append('client_secret', '09dy1hb45nWcw3sID4luD7ToMqZez9H4');
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await axios.post(
        'http://localhost:8080/realms/nestjs-realm/protocol/openid-connect/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data; // access_token, refresh_token, etc.
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas o cuenta no configurada.');
    }
  }

  create(Login: LoginDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, UpdateLogin: UpdateLoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
