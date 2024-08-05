import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ErrorDBResponse } from './interfaces/error-db';

@Injectable()
export class ErrorHandleService {

  private readonly logger = new Logger('ErrorHandleService');
  public errorDB(error: ErrorDBResponse){
    switch (error.number) {
      case 2627:
        throw new BadRequestException(error.originalError.info.message);
        break;
      case 515:
        throw new BadRequestException(error.originalError.info.message);
        break;
        case 547:
        console.log(error);
        throw new BadRequestException(error.originalError.info.message);
        break;
    
      default:
        console.log(error)
        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected Error');
        break;
    }
  }
}
