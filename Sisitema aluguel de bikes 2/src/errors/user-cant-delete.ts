export class UserNotCantDelete extends Error {
    public readonly name = 'UserCantDelete'
    constructor() {
        super('User canot be deleted.')
    }
}