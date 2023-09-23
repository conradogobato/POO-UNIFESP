import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"
import { UserNotFoundError } from "./errors/user-not-found-error"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it('should throw user not found error when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })

    it('Should register a user', ()=>{
        const app = new App()
        const user = new User('Teste', 'aaa@gmail.com', 'teste', 'a23s47&%l*Ës')
        app.registerUser(user)
        expect(app.findUser('aaa@gmail.com')).toEqual(user)
    })

    it('Should remove user correctly', ()=>{
        const app = new App()
        const user = new User('Teste', 'aaa@gmail.com', 'teste', 'a23s47&%l*Ës')
        app.registerUser(user)
        expect(app.findUser('aaa@gmail.com')).toEqual(user)
        app.removeUser('aaa@gmail.com')
        expect(app.findUser('aaa@gmail.com')).toThrow(UserNotFoundError)
    })

    it('Should throw user not found error when is no user to remove', ()=>{
        const app = new App()
        expect(app.removeUser('Fake User')).toThrow(UserNotFoundError)
    })

    it('Should return true on successfully authenticated', ()=>{
        const app = new App()
        const user = new User('Teste', 'aaa@gmail.com', 'teste', 'a23s47&%l*Ës')
        expect(app.authenticate('aaa@gmail.com', 'a23s47&%l*Ës')).toBeTruthy
    })

    it('Should return false on not successfully authenticated', ()=>{
        const app = new App()
        const user = new User('Teste', 'aaa@gmail.com', 'teste', 'a23s47&%l*Ës')
        expect(app.authenticate('aaa@gmail.com', 'senhaErrada')).toBeFalsy
    })

    it('Should return bike if finded', ()=>{
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        expect(app.findBike(bike.id)).toEqual(bike)
    })

    it('Should return error if searching for bike that soes not exist', ()=>{
        const app = new App()
        expect(app.findBike('fake id')).toThrow(BikeNotFoundError)
    })
})