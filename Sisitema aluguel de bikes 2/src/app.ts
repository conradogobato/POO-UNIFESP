import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';

export class App{
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    findUser(email:string){
        return this.users.find(user => user.email == email)
    }

    addUser(user: User): void{
        if(this.users.some(Ruser =>{return Ruser.email === user.email})){
            throw new Error('User email already exist!')
        }
        else{
            user.id = crypto.randomUUID()
            this.users.push(user)
        }
    }

    addBike(bike: Bike): void{
        if(this.bikes.some(Rbike =>{return Rbike.name === bike.name})){
            throw new Error('Bicycle already exist!')
        }
        else{
            bike.id = crypto.randomUUID()
            this.bikes.push(bike)
        }
    }

    removeUser(email: string){
        if(this.users.some(Ruser =>{return Ruser.email === email})){
            const remove_index = this.users.findIndex(user => user.email == email)
            this.users.splice(remove_index, 1)
        }
    }
    
    rentBike(bikeId: string, userEmail: string): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        if (!bike.available) {
            throw new Error('Unavailable bike.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        bike.available = false
        const newRent = new Rent(bike, user, new Date())
        this.rents.push(newRent)
    }

    returnBike(bike:Bike, user:User){
        const now = new Date()
        const rent = this.rents.find(rent =>
            rent.bike.id === bike.id &&
            rent.user.email === user.email &&
            !rent.dateTo
        )
        if (!rent) throw new Error('Rent not found.')
        rent.dateTo = now
        rent.bike.available = true
        const hours = diffHours(rent.dateTo, rent.dateFrom)
        return hours * rent.bike.rate
    }

    listBike(bikes: Bike[]){
        bikes.forEach(bike => {
            console.log(bike.name)
        });
    }
    listUser(users: User[]){
        users.forEach(user => {
            console.log(user.name)
        });
    }
    listRent(rents: Rent[]){
        rents.forEach(rent => {
            console.log(rent)
        });
    }
    authenticateUser(userId: string, password: string, users: User[]){

        const toAuthenticate = users.filter(user => userId === user.id)[0]

        try{
            toAuthenticate.password === password
            return('Authenticated')
        }catch(err){
            console.log('Error to authenticate')
        }
        
    }

    getBikeloc(lat: number, lon: number, bike: Bike){
        bike.coords.push(lat)
        bike.coords.push(lon)
    }
}

function diffHours(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
  }