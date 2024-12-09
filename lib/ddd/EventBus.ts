import {DomainEvent} from "@/lib/ddd/DomainEvent";

export interface EventBus {
    publish(event: DomainEvent | DomainEvent[]): Promise<void>;

    subscribe<T extends DomainEvent>(eventType: {
        new(...args: never[]): T
    }, handler: (event: T) => Promise<void> | void): void;
}