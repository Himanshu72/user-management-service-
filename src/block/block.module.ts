import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import BlockSchema from './schema/blockuser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlockUser', schema: BlockSchema }, { name: 'User', schema: UserSchema }])
  ],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
