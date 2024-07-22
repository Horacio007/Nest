import { Injectable } from '@nestjs/common';

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
        return car;
    }
}
