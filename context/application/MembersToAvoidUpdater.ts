import {GameRepository} from "@/context/domain/GameRepository";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {MemberName} from "@/context/domain/MemberName";
import {GameFinder} from "../domain/service/GameFinder";

export class MembersToAvoidUpdater {

    private readonly gameFinder: GameFinder;

    constructor(private readonly gameRepository: GameRepository) {
        this.gameFinder = new GameFinder(gameRepository);
    }

    public async updateMembersToAvoid(command: { gameId: string, memberSecret: string, membersToAvoid: string[] }) {
        const gameId = GameId.create(command.gameId);
        const game = await this.gameFinder.getById(gameId);
        const memberSecret = MemberSecret.create(command.memberSecret);
        const membersToAvoid = command.membersToAvoid.map(MemberName.create);
        game.updateMembersToAvoid(memberSecret, membersToAvoid);
        await this.gameRepository.update(game);
    }
}