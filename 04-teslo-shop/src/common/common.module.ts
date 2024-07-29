import { Module } from '@nestjs/common';
import { CommonFunctionsService } from './common.functions.service';
import { ErrorHandleService } from './common.error-handler.service';

@Module({
  controllers: [],
  providers: [
    CommonFunctionsService,
    ErrorHandleService
  ],
  exports: [
    CommonFunctionsService,
    ErrorHandleService
  ]
})
export class CommonModule {}
