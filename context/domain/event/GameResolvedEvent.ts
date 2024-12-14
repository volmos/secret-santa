import {DomainEvent} from "@/lib/ddd/DomainEvent";
import {GameId} from "@/context/domain/GameId";
import {Assigment} from "@/context/domain/Assigment";

export class GameResolvedEvent extends DomainEvent {

    public readonly gameId: string;
    public readonly assigment: Record<string, string>;

    constructor(gameId: GameId, assigment: Assigment) {
        super();
        this.gameId = gameId.toString();
        this.assigment = assigment.toPrimitives();
    }

}