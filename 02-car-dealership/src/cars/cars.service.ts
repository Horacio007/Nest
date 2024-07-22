import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar as Car } from './interfaces/car.interface';
import { v7 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {

    private cars:Car[] = [
        {
            id:uuid(),
            brand:'Toyota',
            model:'Hilux'
        }, {
            id:uuid(),
            brand:'Volkswagen',
            model:'Jetta'
        }, 
        {
            id:uuid(),
            brand:'Jeep',
            model:'GrandCheroke'
        },
        {
            id:uuid(),
            brand:'Honda',
            model:'Civic'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id:string) {
        const car = this.cars.find(x => x.id === id);
        
        if(!car) throw new NotFoundException(`Car with id=>${id} not found.`);

        return car;
    }

    create(createCarDto:CreateCarDto): CreateCarDto {
        const car:Car = {
            id:uuid(),
            ...createCarDto
        };
        this.cars.push(car);
        
        return car;
    }

}
