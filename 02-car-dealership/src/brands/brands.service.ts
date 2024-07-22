import { BadRequestException, Injectable } from '@nestjs/common';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { v7 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands:Brand[] = [
    {
      id: uuid(),
      name: 'Mazzerati',
      createdAt: new Date().getTime()
    }
  ]

  create(createBrandDto: CreateBrandDto):Brand {
    const { name } = createBrandDto;
    const brand:Brand = {
      id:uuid(),
      name:name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }
    this.brands.push(brand);

    return brand;
  }

  findAll():Brand[] {
    return this.brands;
  }

  findOne(id: string):Brand {
    const brand = this.brands.find(brand => brand.id === id);
    if(!brand) throw new BadRequestException(`Brand with id => ${id} not found.`);
  
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto):Brand {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map(brand => {
      if(brand.id === id) {
        brandDB.updated = new Date().getTime();
        brandDB = {...brandDB, ...updateBrandDto};
        return brandDB;
      }
      return brand;
    });

    return brandDB;
  }

  remove(id: string):void {
    let brandDB = this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== brandDB.id);
  }
}
