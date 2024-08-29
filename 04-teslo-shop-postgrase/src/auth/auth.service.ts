import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly errorHandleDB: ErrorHandleService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)
      delete user.password;

      // TODO: Retorna json web token
      return user;
    } catch (error) {
      this.errorHandleDB.errorHandleDB(error);
    }
  }

}
