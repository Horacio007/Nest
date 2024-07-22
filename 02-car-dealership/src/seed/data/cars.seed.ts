import { ICar as Car } from './../../cars/interfaces/car.interface';
import { v7 as uuid } from 'uuid';

export const CARS_SEED:Car[] = [
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