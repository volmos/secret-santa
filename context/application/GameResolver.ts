import {GameRepository} from "@/context/domain/GameRepository";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {EventBus} from "@/lib/ddd/EventBus";
import {GameFinder} from "@/context/domain/service/GameFinder";
import {NotOwnerMemberException} from "@/context/domain/exception/NotOwnerMemberException";

    export class GameResolver {

    private readonly gameFinder: GameFinder;

    constructor(private readonly gameRepository: GameRepository, private readonly eventBus: EventBus) {
        this.gameFinder = new GameFinder(gameRepository);
    }

    public async resolveGame(command: { gameId: string, memberSecret: string }) {
        const id = GameId.create(command.gameId);
        const game = await this.gameFinder.getById(id);
        if (!game.isOwnerSecret(MemberSecret.create(command.memberSecret))) {
            throw new NotOwnerMemberException();
        }
        game.resolve();
        await this.gameRepository.update(game);
        this.eventBus.publish(game.pullDomainEvents());
    }

}