export class NotOwnerMemberException extends Error {

    constructor() {
        super('Only the owner can resolve the game');
    }

}