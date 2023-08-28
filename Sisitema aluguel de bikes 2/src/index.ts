import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('Xray', 'road', 46, 10, 5)

const user = new User('Rafael', 'rafael@gmail.com', '02198')

const today = new Date()

const twoDaysfromToday = new Date()
twoDaysfromToday.setDate(twoDaysfromToday.getDate()+2)


const rentOne = Rent.create([], bike, user, today, twoDaysfromToday)