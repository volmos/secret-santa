import {Member} from "@/context/domain/Member";

export class Assigment {

    constructor(private readonly value: Map<Member, Member>) {
    }

    public static fromPrimitives(primitives: Record<string, string>, members: Member[]) {
        return new Assigment(Object.entries(primitives).reduce((acc, [memberName, memberToAssignName]) => {
            const member = members.find(member => member.name.toString() === memberName);
            const memberToAssign = members.find(member => member.name.toString() === memberToAssignName);
            if (!member || !memberToAssign) {
                throw new Error('Member or member to assign not found');
            }
            acc.set(member, memberToAssign);
            return acc;
        }, new Map<Member, Member>()));
    }

    public static create() {
        return new Assigment(new Map<Member, Member>());
    }

    public toPrimitives() {
        return Array.from(this.value.entries()).reduce((acc, [member, memberToAssign]) => {
            return {
                ...acc,
                [member.name.toString()]: memberToAssign.name.toString()
            };
        }, {});
    }

    public add(member: Member, memberToAssign: Member) {
        if (this.value.has(member)) {
            throw new Error('Member already has a assignment');
        }
        this.value.set(member, memberToAssign);
    }

    public delete(member: Member) {
        if (!this.value.has(member)) {
            throw new Error('Member has no assignment');
        }
        this.value.delete(member);
    }

    public getSecretAssigment(): Record<string, string> {
        return Array.from(this.value.entries()).reduce((acc, [member, memberToAssign]) => {
            return {
                ...acc,
                [member.secret.toString()]: memberToAssign.name.toString()
            };
        }, {});
    }

}