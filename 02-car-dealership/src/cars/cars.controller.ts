import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto'
import { ICar as Car } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService:CarsService) {

    }
    
    @Get()
    getAllCars():Car[] {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id:string):Car {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(@Body() createCarDto:CreateCarDto):CreateCarDto {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id:string,
        @Body() updateCarDto:UpdateCarDto):UpdateCarDto {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id:string):void {
        return this.carsService.delete(id);
    }

}
