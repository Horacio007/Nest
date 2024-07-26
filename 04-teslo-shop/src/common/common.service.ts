import { Injectable } from '@nestjs/common';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { v7 as uuid } from 'uuid';

@Injectable()
export class CommonService {
  create(createCommonDto: CreateCommonDto) {
    return 'This action adds a new common';
  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number, updateCommonDto: UpdateCommonDto) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }

  formatString = (template, ...args) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] === 'undefined' ? match : args[index];
    });
  }

  getUuid():string {
    return uuid();
  }
}
