import {GameId} from "@/context/domain/GameId";
import {Member} from "@/context/domain/Member";
import {DomainEvent} from "@/lib/ddd/DomainEvent";

export class MemberUpdatedEvent extends DomainEvent {

    public readonly gameId: string;
    public readonly name: string;
    public readonly membersToAvoid: string[];

    constructor(gameId: GameId, member: Member) {
        super();
        this.gameId = gameId.toString();
        const {name, membersToAvoid} = member.toPrimitives();
        this.name = name;
        this.membersToAvoid = membersToAvoid;
    }

}