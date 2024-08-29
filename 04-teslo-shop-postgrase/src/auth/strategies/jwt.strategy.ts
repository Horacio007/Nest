import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { TypeError } from 'src/common/enums/common.error-handle.enum';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        configService:ConfigService,
        private readonly errorHandleService:ErrorHandleService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload:JwtPayload): Promise<User> {
        const {email, id} = payload;
        const user = await this.userRepository.findOne({
            where: {email, id}
        });

        if (!user) this.errorHandleService.errorHandle('Token not valid.', TypeError.UnauthorizedException);

        if (!user.isActive) this.errorHandleService.errorHandle('User inactive.', TypeError.UnauthorizedException);

        return user;
    }
}