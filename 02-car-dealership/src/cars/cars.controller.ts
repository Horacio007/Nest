import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService:CarsService) {

    }
    
    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    async getCarById(@Param('id', ParseIntPipe) id:number) {
        return await this.carsService.findOneById(id);
    }

}
