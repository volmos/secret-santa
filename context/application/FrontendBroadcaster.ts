import {EventBus} from "@/lib/ddd/EventBus";
import {NewMemberEvent} from "@/context/domain/event/NewMemberEvent";
import {FrontendNotifier} from "@/context/domain/FrontendNotifier";
import {GameResolvedEvent} from "@/context/domain/event/GameResolvedEvent";
import {MemberUpdatedEvent} from "@/context/domain/event/MemberUpdatedEvent";

export class FrontendBroadcaster {

    constructor(private readonly frontendNotifier: FrontendNotifier, eventBus: EventBus) {
        eventBus.subscribe(NewMemberEvent, this.handleNewMember.bind(this));
        eventBus.subscribe(GameResolvedEvent, this.handleGameResolved.bind(this));
        eventBus.subscribe(MemberUpdatedEvent, this.handleMemberUpdated.bind(this));
    }

    public async handleNewMember(event: NewMemberEvent): Promise<void> {
        await this.frontendNotifier.notify(event.gameId, 'new-member', {
            name: event.memberName,
            membersToAvoid: event.memberMembersToAvoid
        });
    }

    public async handleGameResolved(event: GameResolvedEvent): Promise<void> {
        await this.frontendNotifier.notify(event.gameId, 'resolved', event.assigment);
    }

    public async handleMemberUpdated(event: MemberUpdatedEvent): Promise<void> {
        await this.frontendNotifier.notify(event.gameId, 'member-updated', {
            name: event.name,
            membersToAvoid: event.membersToAvoid
        });
    }

}