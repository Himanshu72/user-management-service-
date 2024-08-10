import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import BlockSchema from 'src/block/schema/blockuser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'BlockUser', schema: BlockSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
