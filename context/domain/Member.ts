import {MemberSecret} from "@/context/domain/MemberSecret";
import {MemberName} from "@/context/domain/MemberName";

export class Member {

    constructor(public readonly name: MemberName, public readonly secret: MemberSecret, public membersToAvoid: MemberName[]) {
    }

    public static create(name: MemberName, secret: MemberSecret) {
        return new Member(name, secret, []);
    }

    public static fromPrimitives(primitives: { name: string, secret: string, membersToAvoid: string[] }) {
        return new Member(new MemberName(primitives.name), new MemberSecret(primitives.secret), primitives.membersToAvoid.map(name => new MemberName(name)));
    }

    public toPrimitives() {
        return {
            name: this.name.toString(),
            secret: this.secret.toString(),
            membersToAvoid: this.membersToAvoid.map(name => name.toString())
        }
    }

    public updateMembersToAvoid(membersToAvoid: MemberName[]) {
        this.membersToAvoid = membersToAvoid;
    }

    public hasSecret(secret?: MemberSecret) {
        return this.secret.equals(secret);
    }

    public hasName(name: MemberName) {
        return this.name.toString() === name.toString();
    }

    public hasSameName(member: Member) {
        return this.hasName(member.name);
    }

    public excludes(candidate: Member) {
        return this.membersToAvoid.some(memberToAvoid => candidate.hasName(memberToAvoid));
    }
}