
export class MemberAvoidItselfException extends Error {

    constructor() {
        super('A member cannot avoid itself');
    }

}