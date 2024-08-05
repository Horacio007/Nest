import { Injectable } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class FunctionsService {

    public isUUID(uuid:string) {
        if (!validate(uuid)) return false;

        return true;
    }

}
