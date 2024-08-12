import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { TypeError } from 'src/common/enums/common.error-handle.enum';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService, private readonly errorHandleService:ErrorHandleService) {}

  @Get('producto/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName:string
    ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);

    //return path;
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    
    if (!file) this.errorHandleService.errorHandle('Make sure that the file is an image', TypeError.BadRequestException);

    const secureUrl = `${file.filename}`;

    return {
      secureUrl
    }

  }
 
}
