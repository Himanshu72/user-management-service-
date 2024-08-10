import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlockModule } from './block/block.module';

// user service
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://himanshu:joshi%40123@cluster0-edkju.mongodb.net/users_managment?retryWrites=true&w=majority'),
     UsersModule,
     BlockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
