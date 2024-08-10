import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {

    return this.usersService.create(createUserDto);
  }

  @MessagePattern('searchUser')
  searchUser({username, payload}) {
    return this.usersService.searchUser(username, payload);
  }

  @MessagePattern('getUser')
  findOne(@Payload() username: string) {
    return this.usersService.findOne(username);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() usename: string) {
    return this.usersService.remove(usename);
  }
}
