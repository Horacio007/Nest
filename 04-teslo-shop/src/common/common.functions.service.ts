import { Injectable } from '@nestjs/common';
import { v7 as uuid } from 'uuid';

@Injectable()
export class CommonFunctionsService {

  formatString = (template, ...args) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] === 'undefined' ? match : args[index];
    });
  }

  getUuid():string {
    return uuid();
  }
}
