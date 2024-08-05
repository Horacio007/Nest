import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [GenderController],
  providers: [GenderService],
  imports: [ TypeOrmModule.forFeature([
      Gender
    ]),
    CommonModule
  ]
})
export class GenderModule {}
