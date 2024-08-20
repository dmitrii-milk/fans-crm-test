import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IntegerParamPipe } from '../pipes/integer-param.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller({
  version: '1',
  path: 'api',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('get-user/:id')
  async findOne(@Param('id', IntegerParamPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
