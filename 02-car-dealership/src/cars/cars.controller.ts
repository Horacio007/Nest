import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    @Post()
    createCar(@Body() body:any) {
        return {
            body
        }
    }

    @Patch(':id')
    updateCar(@Body() body:any) {
        return {
            body
        }
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseIntPipe) id:number) {
        return {
            method: 'Delete',
            id:id
        };
    }

}
