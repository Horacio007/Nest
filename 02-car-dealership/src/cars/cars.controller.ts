import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars:string[] = ['Toyota', 'Volkswagen', 'Jeep', 'Honda'];
    
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
