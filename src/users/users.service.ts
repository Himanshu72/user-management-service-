import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { subYears } from 'date-fns';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
    @InjectModel('BlockUser') private readonly blockUserModel: Model<any>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async searchUser(loginUsername:string, payload: any): Promise<any[]> {
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

    return existingUser
  }

  async remove(username: string): Promise<void> {
    const result = await this.userModel.deleteOne({ username }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
  }
}
