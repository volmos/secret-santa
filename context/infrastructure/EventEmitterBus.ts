import {EventEmitter} from 'events';
import {EventBus} from "@/lib/ddd/EventBus";
import {DomainEvent} from "@/lib/ddd/DomainEvent";

export class EventEmitterBus implements EventBus {
    private emitter = new EventEmitter();

    public async publish(event: DomainEvent | DomainEvent[]): Promise<void> {
        if (Array.isArray(event)) {
            event.forEach((e) => this.emitter.emit(e.constructor.name, e));
        } else {
            this.emitter.emit(event.constructor.name, event);
        }
    }

    public subscribe<T extends DomainEvent>(eventType: {
        new(...args: never[]): T
    }, handler: (event: T) => Promise<void> | void): void {
        this.emitter.on(eventType.name, (event: T) => {
            handler(event);
        });
    }
}