import {GameRepository} from "@/context/domain/GameRepository";
import {Member} from "@/context/domain/Member";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {MemberName} from "@/context/domain/MemberName";
import {EventBus} from "@/lib/ddd/EventBus";
import {GameFinder} from "@/context/domain/service/GameFinder";

export class MemberAdder {

    private readonly gameFinder: GameFinder;

    constructor(private readonly gameRepository: GameRepository, private readonly eventBus: EventBus) {
        this.gameFinder = new GameFinder(gameRepository);
    }

    public async addMember(command: { gameId: string, memberName: string, memberSecret: string }) {
        const id = GameId.create(command.gameId);
        const game = await this.gameFinder.getById(id);
        const member = Member.create(MemberName.create(command.memberName), MemberSecret.create(command.memberSecret));
        game.addMember(member);
        await this.gameRepository.update(game);
        this.eventBus.publish(game.pullDomainEvents());
    }

}