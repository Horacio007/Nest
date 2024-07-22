import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICar as Car } from './interfaces/car.interface';
import { v7 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars:Car[] = [
        // {
        //     id:uuid(),
        //     brand:'Toyota',
        //     model:'Hilux'
        // }, {
        //     id:uuid(),
        //     brand:'Volkswagen',
        //     model:'Jetta'
        // },
        // {
        //     id:uuid(),
        //     brand:'Jeep',
        //     model:'GrandCheroke'
        // },
        // {
        //     id:uuid(),
        //     brand:'Honda',
        //     model:'Civic'
        // }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id:string):Car {
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

    update(id:string, updateCarDto:UpdateCarDto):UpdateCarDto {
        let carDB = this.findOneById(id);

        if(updateCarDto.id &&  updateCarDto.id !== id) throw new BadRequestException('Car id is not valid inside body.');

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB;
            }

            return car;
        });

        return carDB;
    }

    delete(id:string) {
        let carDB = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== carDB.id);
    }

    fillCarsWithSeedData(cars:Car[]):void {
        
    }

}
