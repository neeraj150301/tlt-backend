import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './controller/users.controller';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './service/users.service';
// import { AuthGateway } from './gateway/auth.gateway';
// import { MobileNotificationService } from '../notification/service/mobile-notification.service';
// import { EmployeeService } from '../hr/employees/employees.service';
// import { UserGateway } from './gateway/user.gateway';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'auth',
    ),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    // AuthGateway,
    // MobileNotificationService,
    // UserGateway,
  ],
  exports: [JwtStrategy, PassportModule, UsersService,],
})
export class AuthModule {}
