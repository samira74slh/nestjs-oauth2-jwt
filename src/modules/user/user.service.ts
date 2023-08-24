import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ValidateUserDto } from './dto/validate-user.dto';
import { USER_REPOSITORY } from './constants/user-rep.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) { }

  async validateUser(info: ValidateUserDto): Promise<User> {
    try {
      if (!info) {
        throw new BadRequestException('Unauthenticated');
      }
      let user = await this.userRepository.findOne({
        where: { email: info.email },
      });
      // registration
      if (!user)
        user = await this.userRepository.save(this.userRepository.create(info));
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      let user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new BadRequestException(`No user found with id ${id}`);
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  getProtectedMessage(): string {
    return 'You can only see this if you are authenticated';
  }
}
