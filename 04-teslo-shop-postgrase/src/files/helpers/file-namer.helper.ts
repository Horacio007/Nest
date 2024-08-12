import { Request } from "express";
import { ErrorHandleService } from "src/common/common.error-handle.service";
import { TypeError } from "src/common/enums/common.error-handle.enum";
import { v4 as uuid } from "uuid";

export const fileNamer = (req: Request, file: Express.Multer.File, callback:Function) => {
    let errorHandleService:ErrorHandleService = new ErrorHandleService();
    
    if(!file) return callback(errorHandleService.errorHandle('e', TypeError.Error), false);

    const fileExtencion = file.mimetype.split('/')[1];
    
    const fileName = `${uuid()}.${fileExtencion}`;

    callback(null, fileName);
};