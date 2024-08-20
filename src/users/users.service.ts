import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const result = await this.userModel.create({
        name: createUserDto.name,
        phone: createUserDto.phone,
        email: createUserDto.email,
      });

      Logger.verbose(`User was created: ${JSON.stringify(result, null, 2)}`);

      return result;
    } catch (e: unknown) {
      Logger.error('create error:', e);

      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid parameters',
      });
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return this.userModel.findOne({
        where: {
          id,
        },
      });
    } catch (e: unknown) {
      Logger.error('Find one error:', e);
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Not Found',
      });
    }
  }
}
