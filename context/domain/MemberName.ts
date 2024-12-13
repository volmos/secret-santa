import {ValidationException} from "@/context/domain/exception/ValidationException";

export class MemberName {

    public constructor(private readonly value: string) {
    }

    public static create(value: string): MemberName {
        if (value.length < 3 || value.length > 100) {
            throw new ValidationException('Invalid member name');
        }
        return new MemberName(value);
    }

    public toString(): string {
        return this.value;
    }

}