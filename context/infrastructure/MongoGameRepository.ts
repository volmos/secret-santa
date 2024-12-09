import {GameRepository} from "@/context/domain/GameRepository";
import {Game} from "@/context/domain/Game";
import {MongoClient} from "mongodb";
import {GameId} from "@/context/domain/GameId";

export class MongoGameRepository implements GameRepository {

    constructor(private readonly mongoClient: MongoClient) {
    }

    public async insert(game: Game): Promise<void> {
        const gamePrimitives = game.toPrimitives();
        await this.getCollection().insertOne({
            id: gamePrimitives.id,
            ownerName: gamePrimitives.ownerName,
            members: gamePrimitives.members
        });
    }

    public async update(game: Game): Promise<void> {
        const gamePrimitives = game.toPrimitives();
        await this.getCollection().updateOne({id: gamePrimitives.id}, {
            $set: {
                ownerName: gamePrimitives.ownerName,
                members: gamePrimitives.members,
                assigment: gamePrimitives.assigment
            }
        });
    }

    public async get(id: GameId): Promise<Game | null> {
        const dbGame = await this.getCollection().findOne({id: id.toString()});
        if (!dbGame) {
            return null;
        }
        return Game.fromPrimitives({
            id: dbGame.id,
            ownerName: dbGame.ownerName,
            members: dbGame.members,
            assigment: dbGame.assigment
        });
    }

    private getCollection() {
        return this.mongoClient.db('secret-santa').collection<{
            id: string,
            ownerName: string,
            members: {
                name: string,
                secret: string,
                membersToAvoid: string[]
            }[],
            assigment?: Record<string, string>
        }>('games');
    }

}