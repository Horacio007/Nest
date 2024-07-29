import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class BussinesRulesService {

    productValidation(createProductDto:CreateProductDto):void {
        
      if (!createProductDto.slug) {
        createProductDto.slug = createProductDto.title;
      }
  
      createProductDto.slug = createProductDto.slug
        .toLocaleLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'');
    }
}
