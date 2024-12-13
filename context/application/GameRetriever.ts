import {GameRepository} from "@/context/domain/GameRepository";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {GameFinder} from "../domain/service/GameFinder";
import {Game} from "@/context/domain/Game";

export interface RetrieveGameResponse {
    members: {
        name: string;
        membersToAvoid: string[];
    }[];
    isResolved: boolean;
    result?: Record<string, string>;
    me?: {
        isOwner: boolean;
        name: string;
        membersToAvoid: string[];
        secret: string;
    };
}

export class GameRetriever {

    private readonly gameFinder: GameFinder;

    constructor(gameRepository: GameRepository) {
        this.gameFinder = new GameFinder(gameRepository);
    }

    public async retrieveGame(query: { gameId: string, memberSecret?: string }) {
        const gameId = GameId.create(query.gameId);
        const game = await this.gameFinder.getById(gameId);
        const secret = query.memberSecret ? MemberSecret.create(query.memberSecret) : undefined;
        const response: RetrieveGameResponse = {
            members: game.getMembersExceptSecret(secret),
            isResolved: game.isResolved(),
            result: game.getSecretAssigment()
        };
        if (secret) {
            response.me = this.getMeInfo(game, secret);
        }
        return response;
    }

    private getMeInfo(game: Game, secret: MemberSecret) {
        const memberPrimitives = game.getMemberBySecret(secret).toPrimitives();
        return {
            isOwner: game.isOwnerSecret(secret),
            name: memberPrimitives.name,
            membersToAvoid: memberPrimitives.membersToAvoid,
            secret: memberPrimitives.secret
        };
    }

}