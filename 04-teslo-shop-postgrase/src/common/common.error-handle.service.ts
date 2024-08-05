import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ErrorHandleDB } from './interfaces/error-handler.interface';

@Injectable()
export class ErrorHandleService {
    private readonly logger = new Logger('ErrorHandleService');

    public errorHandleDB(error: ErrorHandleDB){
        switch (+error.code) {
            case 23505:
                throw new BadRequestException(`${error.severity} => ${error.detail}`);
                break;
            case 22001:
                throw new BadRequestException(`${error.severity} => ${error.detail}`);
                break;
            default:
                console.log(error);
                this.logger.error(error);
                throw new InternalServerErrorException('Unexpected Error');
                break;
        }
        
    }

    public errorHandle(message: string, method:string){
        switch (method) {
            case 'nfe':
                throw new NotFoundException(`${message}`);
                break;
        
            default:
                throw new InternalServerErrorException('Unexpected Error');
                break;
        }
        
    }
}
