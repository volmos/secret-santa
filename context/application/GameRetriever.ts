import {GameRepository} from "@/context/domain/GameRepository";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {GameFinder} from "../domain/service/GameFinder";

export class GameRetriever {

    private readonly gameFinder: GameFinder;

    constructor(gameRepository: GameRepository) {
        this.gameFinder = new GameFinder(gameRepository);
    }

    public async retrieveGame(query: { gameId: string, memberSecret?: string }) {
        const gameId = GameId.create(query.gameId);
        const game = await this.gameFinder.getById(gameId);
        const secret = query.memberSecret ? MemberSecret.create(query.memberSecret) : undefined;
        const memberPrimitives = secret ? game.getMemberBySecret(secret).toPrimitives() : undefined;
        return {
            isOwner: !!secret && game.isOwnerSecret(secret),
            memberName: memberPrimitives?.name,
            memberMembersToAvoid: memberPrimitives?.membersToAvoid,
            members: game.getMembersExceptSecret(secret),
            isResolved: game.isResolved(),
            result: game.getSecretAssigment()
        };
    }

}