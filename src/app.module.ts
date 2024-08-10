import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlockModule } from './block/block.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache/cache.service';

// user service
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://himanshu:joshi%40123@cluster0-edkju.mongodb.net/users_managment?retryWrites=true&w=majority'),
     UsersModule,
     BlockModule,
     CacheModule.register({
      ttl: 600,
    })],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
