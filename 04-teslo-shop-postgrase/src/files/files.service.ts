import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { TypeError } from 'src/common/enums/common.error-handle.enum';

@Injectable()
export class FilesService {

    constructor( 
        private readonly errorHandleService:ErrorHandleService
    ) { }
  
    getStaticProductImage(imageName:string) {
        const path = join(__dirname, '../../static/products', imageName);

        if (!existsSync) this.errorHandleService.errorHandle(`Not product found with image: ${imageName}`, TypeError.BadRequestException)
        
        return path;
    }

}
