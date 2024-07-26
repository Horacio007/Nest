import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { CommonModule } from 'src/common/common.module';
import { Size } from './entities/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SizesController],
  providers: [SizesService],
  imports: [
    TypeOrmModule.forFeature([
      Size
    ]),
    CommonModule
  ]
})
export class SizesModule {}
