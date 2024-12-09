import {GameRepository} from "@/context/domain/GameRepository";
import {GameId} from "@/context/domain/GameId";
import {GameNotFoundException} from "@/context/domain/exception/GameNotFoundException";

export class GameFinder {

    constructor(private readonly gameRepository: GameRepository) {
    }

    public async getById(id: GameId) {
        const game = await this.gameRepository.get(id);
        if (!game) {
            throw new GameNotFoundException(id);
        }
        return game;
    }

}