import {Member} from "@/context/domain/Member";
import {IllegalStateException} from "@/context/domain/exception/IllegalStateException";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {MemberName} from "@/context/domain/MemberName";

export class Assigment {

    constructor(private readonly value: { giver: MemberSecret, receiver: MemberName }[]) {
    }

    public static fromPrimitives(primitives: Record<string, string>) {
        return new Assigment(Object.entries(primitives).map(([giver, receiver]) => ({
                giver: MemberSecret.create(giver),
                receiver: MemberName.create(receiver)
            })
        ));
    }

    public static create() {
        return new Assigment([]);
    }

    public toPrimitives(): { [key: string]: string } {
        return this.value.reduce((acc, {giver, receiver}) => {
            return {
                ...acc,
                [giver.toString()]: receiver.toString()
            };
        }, {});
    }

    public add(member: Member, memberToAssign: Member) {
        if (this.hasGiver(member)) {
            throw new IllegalStateException('Member already has a assignment');
        }
        this.value.push({giver: member.secret, receiver: memberToAssign.name});
    }

    public delete(member: Member) {
        if (!this.hasGiver(member)) {
            throw new IllegalStateException('Member has no assignment');
        }
        this.value.splice(this.value.findIndex(({giver}) => giver.equals(member.secret)), 1);
    }

    private hasGiver(member: Member) {
        return this.value.some(({giver}) => giver.equals(member.secret));
    }

}