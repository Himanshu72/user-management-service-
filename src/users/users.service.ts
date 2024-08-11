import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { subYears } from 'date-fns';
import { CacheService } from 'src/cache/cache.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
    @InjectModel('BlockUser') private readonly blockUserModel: Model<any>,
    private readonly catchService: CacheService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);
    this.catchService.markInvaliCatch()
    return createdUser.save();
  }

  private generateCacheKey(payload: object): string {
    const payloadString = JSON.stringify(payload);
    return crypto.createHash('sha256').update(payloadString).digest('hex');
}

  async searchUser(loginUsername:string, payload: any): Promise<any[]> {

    const key = this.generateCacheKey({loginUsername, ...payload}) // will reutn same key for same type of payload

    return this.catchService.makeCachable(key, async ()=>{
      const query:any ={}
      if (payload) {
        const { username, minAge, maxAge } = payload;
        const data = await this.blockUserModel.find({username:loginUsername}).exec()
        const blockUsers = data.map(d=>d.blockUsername)
        query['username'] = {  $nin: blockUsers }
        // Calculate the date ranges based on the age
        const today = new Date();
        if (minAge !== null || maxAge !== null) {
          query.birthdate={}
          if (minAge !== null) {
            const minDate = subYears(today, minAge);
            query.birthdate['$lte'] = minDate;
          }
          if (maxAge !== null) {
            const maxDate = subYears(today, maxAge);
            query.birthdate['$gte'] = maxDate;
          }
        }
        if (username) query.username['$regex'] = new RegExp(username, 'i')
      }
      return await this.userModel.find(query).exec();
    })
    
  }


  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }

  async update( updateUserDto: UpdateUserDto) {
    const  {username} = updateUserDto
    const existingUser = await this.userModel.findOneAndUpdate(
      { username },
      { $set: updateUserDto },
      { new: true },
    ).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    this.catchService.markInvaliCatch()
    return existingUser
  }

  async remove(username: string): Promise<void> {
    const result = await this.userModel.deleteOne({ username }).exec();
    this.catchService.markInvaliCatch()
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
  }
}
