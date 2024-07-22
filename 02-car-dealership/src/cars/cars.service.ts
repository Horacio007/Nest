import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
    private cars = [
        {
            id:1,
            brand:'Toyota',
            model:'Hilux'
        }, {
            id:2,
            brand:'Volkswagen',
            model:'Jetta'
        }, 
        {
            id:3,
            brand:'Jeep',
            model:'GrandCheroke'
        },
        {
            id:4,
            brand:'Honda',
            model:'Civic'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id:number) {
        const car = this.cars.find(x => x.id === id);
        
        if(!car) throw new NotFoundException(`Car with id=>${id} not found.`);

        return car;
    }
}
