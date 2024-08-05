import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';
import { CommonFunctionsService } from 'src/common/common.functions.service';

@Injectable()
export class GenderService {

// #region SPs
  private spCreateGender:string = `spGenderInsert @0,@1,@2`;
// #endRegion

  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository:Repository<Gender>,
    @InjectDataSource('default')
    private readonly dataSource:DataSource,
    private readonly commonFunctionsService:CommonFunctionsService
  ) { }

// #region Metodos

  async create(createGenderDto: CreateGenderDto) {
    try {
      const {clave, name} = createGenderDto;
      const genderId = this.commonFunctionsService.getUuid();
      await this.dataSource.manager.query(this.spCreateGender,[clave, name,genderId]);
      
      const gender:Gender = {genderId,...createGenderDto}
    
      return gender;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Ayuda!!!');
    }
  }

  findAll() {
    return `This action returns all gender`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gender`;
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
// #endregion
}
