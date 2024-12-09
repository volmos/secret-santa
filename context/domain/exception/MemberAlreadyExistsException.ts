import {GameId} from "@/context/domain/GameId";
import {MemberName} from "@/context/domain/MemberName";

export class MemberAlreadyExistsException extends Error {

    constructor(gameId: GameId, memberName: MemberName) {
        super(`Member with name ${memberName.toString()} already exists in game ${gameId.toString()}`);
    }

}