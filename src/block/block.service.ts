import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockDto } from './dto/block.dto';


@Injectable()
export class BlockService {
  constructor(
    @InjectModel('BlockUser') private readonly blockUserModel: Model<any>,
    @InjectModel('User') private readonly userModel: Model<any>,
  ) {}


  async isAllUserExist(usernames: string[]): Promise<boolean> {
    try {
      const count = await this.userModel.countDocuments({ username: { $in: usernames } }).exec();
      return usernames.length === count;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  }
  async block(blockDto:BlockDto) {
    const usernme = blockDto.username
    const blockuser = blockDto.blockUsername
    if(! await this.isAllUserExist([usernme, blockuser])) throw new NotFoundException("Record not found, Invalid usernames");
    const createdUser = new this.blockUserModel(blockDto);

    return await createdUser.save();
  }
  async unblock(blockDto:BlockDto) {
    const usernme = blockDto.username
    const blockuser = blockDto.blockUsername
    if(! await this.isAllUserExist([usernme, blockuser])) throw new NotFoundException("Record not found, Invalid usernames");
    const result = await this.blockUserModel.deleteOne({ username: blockDto.username,blockUsername: blockDto.blockUsername  }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException("Record not found");
    }
    return {sucess: true}
  }

}
