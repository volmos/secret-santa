import {Member} from "@/context/domain/Member";
import {GameId} from "@/context/domain/GameId";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {Assigment} from "@/context/domain/Assigment";
import {MemberName} from "@/context/domain/MemberName";
import {shuffleArray} from "@/lib/arrayUtil";
import {AggregateRoot} from "@/lib/ddd/AggregateRoot";
import {NewMemberEvent} from "@/context/domain/event/NewMemberEvent";
import {GameResolvedEvent} from "@/context/domain/event/GameResolvedEvent";
import {MemberAlreadyExistsException} from "@/context/domain/exception/MemberAlreadyExistsException";
import {MemberNotFoundException} from "@/context/domain/exception/MemberNotFoundException";

export class Game extends AggregateRoot {

    private constructor(public readonly id: GameId, private readonly owner: Member, private readonly members: Member[], private assigment?: Assigment) {
        super();
    }

    public static create(id: GameId, owner: Member) {
        return new Game(id, owner, [owner]);
    }

    public static fromPrimitives(primitives: {
        id: string,
        ownerName: string,
        members: { name: string, secret: string, membersToAvoid: string[] }[],
        assigment?: Record<string, string>
    }) {
        const id = new GameId(primitives.id);
        const members = primitives.members.map(member => Member.fromPrimitives(member));
        const owner = members.find(member => member.hasName(new MemberName(primitives.ownerName)));
        if (!owner) {
            throw new Error('Owner not found');
        }
        const assigment = primitives.assigment ? Assigment.fromPrimitives(primitives.assigment, members) : undefined;
        return new Game(id, owner, members, assigment);
    }

    public toPrimitives() {
        return {
            id: this.id.toString(),
            ownerName: this.owner.name.toString(),
            members: this.members.map(member => member.toPrimitives()),
            assigment: this.assigment?.toPrimitives()
        }
    }

    public addMember(member: Member) {
        if (this.members.some(m => m.hasSameName(member))) {
            throw new MemberAlreadyExistsException(this.id, member.name);
        }
        this.members.push(member);
        this.addDomainEvent(new NewMemberEvent(this.id, member));
    }

    public hasMemberWithSecret(memberSecret: MemberSecret) {
        return this.members.some(member => member.hasSecret(memberSecret));
    }

    public isOwnerSecret(secret: MemberSecret) {
        return this.owner.hasSecret(secret);
    }

    public getMembersExceptSecret(memberSecret?: MemberSecret) {
        return this.members.filter(member => !member.hasSecret(memberSecret)).map(member => {
            const {secret, ...memberWithoutSecret} = member.toPrimitives();
            return memberWithoutSecret;
        });
    }

    public resolve() {
        const assignment = Assigment.create();
        const alreadyGifted = new Set<Member>();
        const backtrack = (index: number): boolean => {
            if (index === this.members.length) {
                return true;
            }
            const giver = this.members[index];
            const candidates = this.members.filter((candidate) =>
                candidate !== giver &&
                !alreadyGifted.has(candidate) &&
                !giver.excludes(candidate)
            );
            shuffleArray(candidates);
            for (const candidate of candidates) {
                assignment.add(giver, candidate);
                alreadyGifted.add(candidate);
                if (backtrack(index + 1)) {
                    return true;
                }
                alreadyGifted.delete(candidate);
                assignment.delete(giver);
            }
            return false;
        };
        if (backtrack(0)) {
            this.assigment = assignment;
            this.addDomainEvent(new GameResolvedEvent(this.id, this.assigment));
        } else {
            throw new Error('No solution found');
        }
    }

    public getSecretAssigment() {
        if (!this.assigment) {
            return undefined;
        }
        return this.assigment.getSecretAssigment();
    }

    public isResolved() {
        return !!this.assigment;
    }

    public updateMembersToAvoid(memberSecret: MemberSecret, membersToAvoid: MemberName[]) {
        const member = this.getMemberBySecret(memberSecret);
        if (this.members.length - membersToAvoid.length < 3) {
            throw new Error('Too many members to avoid');
        }
        if (membersToAvoid.some(memberName => !this.isMember(memberName))) {
            throw new Error('Member not found');
        }
        if (membersToAvoid.some(memberName => member.hasName(memberName))) {
            throw new Error('Member cannot avoid itself');
        }
        member.updateMembersToAvoid(membersToAvoid);
    }

    public getMemberBySecret(secret: MemberSecret) {
        const member = this.members.find(member => member.hasSecret(secret));
        if (!member) {
            throw new MemberNotFoundException(this.id, secret);
        }
        return member;
    }

    private isMember(memberName: MemberName) {
        return this.members.some(m => m.hasName(memberName));
    }

}
