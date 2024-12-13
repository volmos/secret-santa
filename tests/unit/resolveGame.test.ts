import {describe, expect, jest, test} from "@jest/globals";
import {GameRepository} from "@/context/domain/GameRepository";
import {generateUuid} from "@/lib/uuidUtil";
import {Game} from "@/context/domain/Game";
import {Member} from "@/context/domain/Member";
import {GameId} from "@/context/domain/GameId";
import {MemberName} from "@/context/domain/MemberName";
import {MemberSecret} from "@/context/domain/MemberSecret";
import {GameResolver} from "@/context/application/GameResolver";
import {EventBus} from "@/lib/ddd/EventBus";

describe('Resolve game', () => {
    const gameRepositoryMock: jest.Mocked<GameRepository> = {
        insert: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
    };
    const eventBusMock: jest.Mocked<EventBus> = {
        publish: jest.fn(),
        subscribe: jest.fn(),
    };
    const gameResolver = new GameResolver(gameRepositoryMock, eventBusMock);

    function mockGameRepositoryGet(gameId: GameId, owner: Member, members: Member[]) {
        gameRepositoryMock.get.mockImplementationOnce((_id: GameId) => {
            const game = Game.create(gameId, owner);
            members.forEach(member => game.addMember(member));
            return Promise.resolve(game);
        });
    }

    describe('Given a game with more than 2 members and without exclusions', () => {
        const gameId = generateUuid();
        const owner = Member.create(MemberName.create('Test1'), MemberSecret.create(generateUuid()));
        const member2 = Member.create(MemberName.create('Test2'), MemberSecret.create(generateUuid()));
        const member3 = Member.create(MemberName.create('Test3'), MemberSecret.create(generateUuid()));
        const member4 = Member.create(MemberName.create('Test4'), MemberSecret.create(generateUuid()));
        const member5 = Member.create(MemberName.create('Test5'), MemberSecret.create(generateUuid()));
        const member6 = Member.create(MemberName.create('Test6'), MemberSecret.create(generateUuid()));

        test('When resolve by owner all members gifts and then nobody gifts himself', async () => {
            mockGameRepositoryGet(GameId.create(gameId), owner, [member2, member3, member4, member5, member6]);

            await gameResolver.resolveGame({gameId, memberSecret: owner.toPrimitives().secret});

            const savedGame = gameRepositoryMock.update.mock.calls[0][0];
            expect(savedGame.isResolved()).toBeTruthy();
            const gamePrimitives = savedGame.toPrimitives();
            expect(gamePrimitives.assigment).toBeDefined();
            const assignments = Object.entries(gamePrimitives.assigment || {});
            expect(assignments.length).toBe(6);
            const members = gamePrimitives.members;
            for (const [memberName, memberToAssignName] of assignments) {
                const member = members.find((m: { name: string }) => m.name === memberName);
                const memberToAssign = members.find((m: { name: string }) => m.name === memberToAssignName);
                expect(memberToAssign).toBeDefined();
                expect(member).toBeDefined();
                expect(memberToAssign?.name).not.toBe(member?.name);
            }
        });

        test('When resolve by not owner member should throw exception', async () => {
            mockGameRepositoryGet(GameId.create(gameId), owner, [member2, member3, member4, member5, member6]);

            await expect(gameResolver.resolveGame({
                gameId,
                memberSecret: generateUuid()
            })).rejects.toThrow('Only the owner can resolve the game');
            expect(gameRepositoryMock.update).not.toHaveBeenCalled();
        });
    });

    describe('Given a game with less than 3 members', () => {
        const gameId = generateUuid();
        const owner = Member.create(MemberName.create('Test1'), MemberSecret.create(generateUuid()));
        const member2 = Member.create(MemberName.create('Test2'), MemberSecret.create(generateUuid()));

        test('When resolve should throw exception', async () => {
            mockGameRepositoryGet(GameId.create(gameId), owner, [member2]);

            await expect(gameResolver.resolveGame({
                gameId,
                memberSecret: owner.toPrimitives().secret
            })).rejects.toThrow('Very few members for resolve game');
            expect(gameRepositoryMock.update).not.toHaveBeenCalled();
        });
    });

    describe('Given a game with exclusions', () => {
        const gameId = generateUuid();
        const owner = Member.create(MemberName.create('Test1'), MemberSecret.create(generateUuid()));
        const member2 = Member.create(MemberName.create('Test2'), MemberSecret.create(generateUuid()));
        const member3 = Member.create(MemberName.create('Test3'), MemberSecret.create(generateUuid()));
        const member4 = Member.create(MemberName.create('Test4'), MemberSecret.create(generateUuid()));
        const member5 = Member.create(MemberName.create('Test5'), MemberSecret.create(generateUuid()));
        const member6 = Member.create(MemberName.create('Test6'), MemberSecret.create(generateUuid()));
        owner.updateMembersToAvoid([member2.name]);
        member2.updateMembersToAvoid([member3.name]);
        member3.updateMembersToAvoid([member4.name]);
        member4.updateMembersToAvoid([member5.name]);
        member5.updateMembersToAvoid([member6.name]);
        member6.updateMembersToAvoid([owner.name]);

        test('When resolve by assigment include exclusions', async () => {
            mockGameRepositoryGet(GameId.create(gameId), owner, [member2, member3, member4, member5, member6]);

            await gameResolver.resolveGame({gameId, memberSecret: owner.toPrimitives().secret});

            const savedGame = gameRepositoryMock.update.mock.calls[0][0];
            expect(savedGame.isResolved()).toBeTruthy();
            const gamePrimitives = savedGame.toPrimitives();
            expect(gamePrimitives.assigment).toBeDefined();
            expect(gamePrimitives.assigment?.[owner.name.toString()]).not.toBe(member2.name.toString());
            expect(gamePrimitives.assigment?.[member2.name.toString()]).not.toBe(member3.name.toString());
            expect(gamePrimitives.assigment?.[member3.name.toString()]).not.toBe(member4.name.toString());
            expect(gamePrimitives.assigment?.[member4.name.toString()]).not.toBe(member5.name.toString());
            expect(gamePrimitives.assigment?.[member5.name.toString()]).not.toBe(member6.name.toString());
            expect(gamePrimitives.assigment?.[member6.name.toString()]).not.toBe(owner.name.toString());
        });
    });

});