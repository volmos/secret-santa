import {DomainEvent} from "@/lib/ddd/DomainEvent";

export abstract class AggregateRoot {
    private domainEvents: DomainEvent[];

    protected constructor() {
        this.domainEvents = [];
    }

    protected addDomainEvent(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    public pullDomainEvents(): DomainEvent[] {
        const events = [...this.domainEvents];
        this.domainEvents = [];
        return events;
    }
}
