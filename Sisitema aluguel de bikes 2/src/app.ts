import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App{
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    addUser(user: User): void{
        if(this.users.some(Ruser =>{return Ruser.email === user.email})){
            throw new Error('User email already exist!')
        }
        this.users.push(user)
    }

    
}