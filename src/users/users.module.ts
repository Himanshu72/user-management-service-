import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import BlockSchema from 'src/block/schema/blockuser.schema';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'BlockUser', schema: BlockSchema }]),
    CacheModule.register({
      ttl: 600,
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, CacheService],
})
export class UsersModule {}
