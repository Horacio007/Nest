import { Module } from '@nestjs/common';
import { ErrorHandleService } from './common.error-handle.service';
import { FunctionsService } from './common.functions.service';

@Module({
  controllers: [],
  providers: [ErrorHandleService, FunctionsService],
  exports: [ErrorHandleService, FunctionsService]
})
export class CommonModule {}
