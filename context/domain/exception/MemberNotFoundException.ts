import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";

export class MemberNotFoundException extends Error {

    constructor(gameId: GameId, memberSecret: MemberSecret) {
        super(`Member with secret ${memberSecret.toString()} not found in game ${gameId.toString()}`);
    }

}