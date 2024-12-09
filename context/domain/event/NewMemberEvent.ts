import {DomainEvent} from "@/lib/ddd/DomainEvent";
import {GameId} from "@/context/domain/GameId";
import {Member} from "@/context/domain/Member";

export class NewMemberEvent extends DomainEvent {

    public readonly gameId: string;
    public readonly memberName: string;
    public readonly memberMembersToAvoid: string[];

    constructor(gameId: GameId, member: Member) {
        super();
        this.gameId = gameId.toString();
        const {name, membersToAvoid} = member.toPrimitives();
        this.memberName = name;
        this.memberMembersToAvoid = membersToAvoid;
    }

}