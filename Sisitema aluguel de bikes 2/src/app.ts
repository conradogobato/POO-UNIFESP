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
    
    rentBike(bike:Bike,user:User, startDate: Date, endDate:Date){
        if(this.rents.some(Rrent =>{return Rrent.bike.id === bike.id})){
            const filtered_array = this.rents.filter(rent => rent.bike.id === bike.id)
            if(Rent.create(filtered_array, bike, user,startDate, endDate)){
                this.rents.push(Rent.create(filtered_array, bike, user,startDate, endDate))
            }
            else{
                throw('Error to create rent!!')
            }
        }
        else{
            this.rents.push(Rent.create(this.rents, bike, user,startDate, endDate))
    }}

    returnBike(bike:Bike, user:User){
        if(this.rents.some(Rrent =>{return Rrent.bike.id === bike.id})){
            const remove_index = this.rents.findIndex(rent => (rent.bike.id === bike.id) && (rent.user.id === user.id))
            this.rents.splice(remove_index, 1)
        }
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
}



