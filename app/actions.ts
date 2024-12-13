'use server';

import {generateUuid} from "@/lib/uuidUtil";
import {gameCreator, gameResolver, gameRetriever, memberAdder, membersToAvoidUpdater} from "@/context/context";
import {redirect} from "next/navigation";
import {errorResult, Result, successResult, unknownErrorResult} from "@/lib/result";
import {RetrieveGameResponse} from "@/context/application/GameRetriever";
import {MemberAlreadyExistsException} from "@/context/domain/exception/MemberAlreadyExistsException";
import {GameNotFoundException} from "@/context/domain/exception/GameNotFoundException";
import {MemberNotFoundException} from "@/context/domain/exception/MemberNotFoundException";
import {TooManyMembersToAvoid} from "@/context/domain/exception/TooManyMembersToAvoid";

export async function createGame(ownerName: string): Promise<Result<void>> {
    const gameId = generateUuid();
    const ownerSecret = generateUuid();
    try {
        await gameCreator.createGame({gameId, ownerName, ownerSecret});
    } catch (_e) {
        return unknownErrorResult();
    }
    redirect(`/${gameId}?secret=${ownerSecret}`);
}

export async function getGame(gameId: string, memberSecret?: string): Promise<Result<RetrieveGameResponse>> {
    try {
        const game = await gameRetriever.retrieveGame({gameId, memberSecret});
        return successResult(game);
    } catch (e) {
        if (e instanceof GameNotFoundException) {
            return errorResult('GAME_NOT_FOUND', 'No se encontró el juego');
        }
        if (e instanceof MemberNotFoundException) {
            return errorResult('MEMBER_NOT_FOUND', 'No se encontró el participante');
        } else {
            return unknownErrorResult();
        }
    }
}

export async function addMember(gameId: string, memberName: string): Promise<Result<void>> {
    const memberSecret = generateUuid();
    try {
        await memberAdder.addMember({gameId, memberName, memberSecret});
    } catch (e) {
        if (e instanceof MemberAlreadyExistsException) {
            return errorResult('MEMBER_ALREADY_EXISTS', 'Ya existe un participante con ese nombre');
        } else {
            return unknownErrorResult();
        }
    }
    redirect(`/${gameId}?secret=${memberSecret}`);
}

export async function resolveGame(gameId: string, memberSecret: string): Promise<Result<void>> {
    try {
        await gameResolver.resolveGame({gameId, memberSecret});
        return successResult();
    } catch (e) {
        if (e instanceof GameNotFoundException) {
            return errorResult('GAME_NOT_FOUND', 'No se encontró el juego');
        } else {
            return unknownErrorResult();
        }
    }
}

export async function updateMembersToAvoid(gameId: string, memberSecret: string, membersToAvoid: string[]): Promise<Result<void>> {
    try {
        await membersToAvoidUpdater.updateMembersToAvoid({gameId, memberSecret, membersToAvoid});
    } catch (e) {
        if (e instanceof GameNotFoundException) {
            return errorResult('GAME_NOT_FOUND', 'No se encontró el juego');
        } else if (e instanceof TooManyMembersToAvoid) {
            return errorResult('TOO_MANY_MEMBERS_TO_AVOID', 'No se pueden evitar tantos participantes');
        } else {
            return unknownErrorResult();
        }
    }
    redirect(`/${gameId}?secret=${memberSecret}`);
}