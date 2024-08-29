import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { TypeError } from 'src/common/enums/common.error-handle.enum';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly errorHandle: ErrorHandleService
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
      this.errorHandle.errorHandleDB(error);
    }
  }

  async login(loginDto: LoginUserDto) {
    const {password, email} = loginDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: {email:true, password: true}
    });

    if (!user || !bcrypt.compareSync(password, user.password)) this.errorHandle.errorHandle('Credentials not valid, Password or email wrong.', TypeError.UnauthorizedException);

    // TODO: Retorna json web token
    return user;
  }

}
