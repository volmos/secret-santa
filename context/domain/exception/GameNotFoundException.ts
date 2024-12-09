import {GameId} from "@/context/domain/GameId";

export class GameNotFoundException extends Error {

    constructor(gameId: GameId) {
        super(`Game with id ${gameId.toString()} not found`);
    }

}