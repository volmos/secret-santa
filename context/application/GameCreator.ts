import {Game} from "@/context/domain/Game";
import {GameRepository} from "@/context/domain/GameRepository";
import {Member} from "@/context/domain/Member";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {MemberName} from "@/context/domain/MemberName";
import {GameAlreadyExistsException} from "@/context/domain/exception/GameAlreadyExistsException";

export class GameCreator {

    constructor(private readonly gameRepository: GameRepository) {
    }

    public async createGame(command: { gameId: string, ownerName: string, ownerSecret: string }) {
        const id = GameId.create(command.gameId);
        const existingGame = await this.gameRepository.get(id);
        if (existingGame) {
            throw new GameAlreadyExistsException(id);
        }
        const owner = Member.create(MemberName.create(command.ownerName), MemberSecret.create(command.ownerSecret));
        const game = Game.create(id, owner);
        await this.gameRepository.insert(game);
    }

}