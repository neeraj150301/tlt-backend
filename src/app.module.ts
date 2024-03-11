import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TltUserModule } from './tlt-user/tlt-user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RmItemModule } from './rm-item/rm-item.module';
// import { RmIssueModule } from './rm-issue/rm-issue.module';
import { TltRmsModule } from './tlt-rms/tlt-rms.module';
import { RmIssueModule } from './rm-issue/rm-issue.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      connectionName: 'tlt',
    }),
    MongooseModule.forRoot(process.env.AUTH_DB, {
      connectionName: 'auth',
    }),
    TltUserModule,
    AuthModule,

    RmItemModule,

    TltRmsModule,

    RmIssueModule,
  
    // RmIssueModule],,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
