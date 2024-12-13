import {isValidUuid} from "@/lib/uuidUtil";
import {ValidationException} from "@/context/domain/exception/ValidationException";

export class GameId {

    public constructor(private readonly value: string) {
    }

    public static create(value: string): GameId {
        if (!isValidUuid(value)) {
            throw new ValidationException('Invalid game ID');
        }
        return new GameId(value);
    }

    public toString(): string {
        return this.value;
    }

}