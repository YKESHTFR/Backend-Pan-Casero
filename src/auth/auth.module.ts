import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'nestjs-realm',
      clientId: 'nestjs-api',
      secret: '2xXhenziDdyOzE6dWnzxUtIzezY4c6Sw',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  AuthService],
  exports:[KeycloakConnectModule]
})
export class AuthModule {}
