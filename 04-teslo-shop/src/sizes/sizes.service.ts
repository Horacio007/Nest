import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class SizesService {

// #region SPs
  private spCreateSize:string = `spSizeInsert @0,@1,@2`;
// #endRegion

  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository:Repository<Size>,
    @InjectDataSource('default')
    private readonly dataSource:DataSource,
    private readonly commonService:CommonService
  ) { }

// #region Metodos

  async create(createSizeDto: CreateSizeDto) {
    try {
      const {clave, name} = createSizeDto;
      const sizeId = this.commonService.getUuid();
      await this.dataSource.manager.query(this.spCreateSize,[clave, name,sizeId]);
      
      const gender:Size = {sizeId,...createSizeDto}
    
      return gender;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Ayuda!!!');
    }
  }

  findAll() {
    return `This action returns all sizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}
