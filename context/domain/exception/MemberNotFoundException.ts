import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {MemberName} from "@/context/domain/MemberName";

export class MemberNotFoundException extends Error {

    constructor(gameId: GameId, member: MemberSecret | MemberName) {
        super(`Member with ${member instanceof MemberSecret ? 'secret' : 'name'} ${member.toString()} not found in game ${gameId.toString()}`);
    }

}