import {isValidUuid} from "@/lib/uuidUtil";

export class MemberSecret {

    constructor(private readonly value: string) {
    }

    public static create(secret: string) {
        if (!isValidUuid(secret)) {
            throw new Error('Invalid member secret');
        }
        return new MemberSecret(secret);
    }

    public toString() {
        return this.value;
    }

    public equals(secret?: MemberSecret) {
        return this.value === secret?.value;
    }
}