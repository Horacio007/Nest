import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { TypeError } from 'src/common/enums/common.error-handle.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly errorHandle: ErrorHandleService,
    private readonly jwtService:JwtService
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

      return {
        ...user,
        token: this.getJwtToken({email: user.email, id: user.id})
      };
    } catch (error) {
      this.errorHandle.errorHandleDB(error);
    }
  }

  async login(loginDto: LoginUserDto) {
    const {password, email} = loginDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: {email:true, password: true, id:true}
    });

    if (!user || !bcrypt.compareSync(password, user.password)) this.errorHandle.errorHandle('Credentials not valid, Password or email wrong.', TypeError.UnauthorizedException);

    return {
      ...user,
      token: this.getJwtToken({email: user.email, id:user.id})
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

}
