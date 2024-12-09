import {GameId} from "@/context/domain/GameId";

export class GameAlreadyExistsException extends Error {

    constructor(gameId: GameId) {
        super(`Game with id ${gameId.toString()} already exists`);
    }

}