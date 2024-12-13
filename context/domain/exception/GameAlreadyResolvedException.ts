
export class GameAlreadyResolvedException extends Error {
    constructor() {
        super('Game already resolved');
    }
}