import {isValidUuid} from "@/lib/uuidUtil";

export class GameId {

    public constructor(private readonly value: string) {
    }

    public static create(value: string): GameId {
        if (!isValidUuid(value)) {
            throw new Error('Invalid game ID');
        }
        return new GameId(value);
    }

    public toString(): string {
        return this.value;
    }

}