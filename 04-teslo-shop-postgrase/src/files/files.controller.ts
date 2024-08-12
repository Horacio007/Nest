import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file-filter.helper';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { TypeError } from 'src/common/enums/common.error-handle.enum';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService, private readonly errorHandleService:ErrorHandleService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  }))
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    
    if (!file) this.errorHandleService.errorHandle('Make sure that the file is an image', TypeError.BadRequestException)

  }
 
}
