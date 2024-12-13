import {describe, expect, jest, test} from "@jest/globals";
import {GameRepository} from "@/context/domain/GameRepository";
import {GameCreator} from "@/context/application/GameCreator";
import {generateUuid} from "@/lib/uuidUtil";
import {Game} from "@/context/domain/Game";
import {Member} from "@/context/domain/Member";
import {GameId} from "@/context/domain/GameId";
import {MemberName} from "@/context/domain/MemberName";
import {MemberSecret} from "@/context/domain/MemberSecret";

describe('Create game', () => {
    const gameRepositoryMock: jest.Mocked<GameRepository> = {
        insert: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
    };
    const gameCreator = new GameCreator(gameRepositoryMock);

    describe('Given valid gameId, ownerName and ownerSecret', () => {
        const gameId = generateUuid();
        const ownerName = 'Test';
        const ownerSecret = generateUuid();
        const command = {gameId, ownerName, ownerSecret};

        test('When not exists a game with same id should create', async () => {
            gameRepositoryMock.get.mockResolvedValue(null);

            await gameCreator.createGame(command);

            const savedGame = gameRepositoryMock.insert.mock.calls[0][0];
            const gamePrimitives = savedGame.toPrimitives();
            expect(gamePrimitives).toStrictEqual({
                id: gameId,
                ownerName,
                members: [
                    {
                        name: ownerName,
                        secret: ownerSecret,
                        membersToAvoid: [],
                    },
                ],
                assigment: undefined,
            });
        });

        test('When gameId already exists should throw exception', async () => {
            const existingGame = Game.create(GameId.create(gameId), Member.create(MemberName.create(ownerName), MemberSecret.create(ownerSecret)));
            gameRepositoryMock.get.mockResolvedValue(existingGame);

            await expect(gameCreator.createGame(command)).rejects.toThrow(`Game with id ${gameId} already exists`);
            expect(gameRepositoryMock.insert).not.toHaveBeenCalled();
        });
    });
});