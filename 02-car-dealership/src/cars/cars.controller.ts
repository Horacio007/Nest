import { Controller, Get, Injectable, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    @Injectable(CarsService);
    
    @Get()
    getAllCars() {
        return this.cars;
    }

    @Get(':id')
    getCarById(@Param('id') id:string) {
        if(!this.cars[id]) return {id:'no existe'}
        
        return {
            id: this.cars[id]
        };
    }

}
