import { Bike } from "./bike";
import { User } from "./user";

export class Rent{
    constructor(
        public bike:Bike,
        public user:User,
        public start:Date,
        public end?:Date,
        public dateReturned?:Date,
    ){}

    // static create(rents: Rent[], bike:Bike, user:User, 
    //     startDate:Date, endDate:Date): Rent{
    //     const canCreate = Rent.canRent(rents, startDate, endDate)
    //     if(canCreate){
    //         return new Rent(bike, user, startDate, endDate)
    //     }
    //     throw new Error('Overlaping Dates!')
    // }

    // static canRent(rents: Rent[], startDate:Date, endDate:Date){
    //     return !rents.some(rent =>{
    //         return startDate <= rent.dateTo && endDate >= rent.dateFrom
    //     })
        
}
