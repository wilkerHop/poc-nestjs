import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
// import { TweetModule } from './tweets/tweet.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule /*,TweetModule*/],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
