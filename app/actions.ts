'use server';

import {generateUuid} from "@/lib/uuidUtil";
import {gameCreator, gameResolver, gameRetriever, memberAdder, membersToAvoidUpdater} from "@/context/context";
import {errorResult, Result, successResult, unknownErrorResult} from "@/lib/result";
import {RetrieveGameResponse} from "@/context/application/GameRetriever";
import {MemberAlreadyExistsException} from "@/context/domain/exception/MemberAlreadyExistsException";
import {GameNotFoundException} from "@/context/domain/exception/GameNotFoundException";
import {MemberNotFoundException} from "@/context/domain/exception/MemberNotFoundException";
import {TooManyMembersToAvoidException} from "@/context/domain/exception/TooManyMembersToAvoidException";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {decrypt, encrypt} from "@/lib/cryptoUtil";

export async function createGame(ownerName: string): Promise<Result<void>> {
    const gameId = generateUuid();
    const ownerSecret = generateUuid();
    try {
        await gameCreator.createGame({gameId, ownerName, ownerSecret});
        await setSecret(gameId, ownerSecret);
    } catch (e) {
        console.error(e);
        return unknownErrorResult();
    }
    redirect(`/${gameId}`);
}

export async function getGame(gameId: string): Promise<Result<RetrieveGameResponse>> {
    const memberSecret = await getSecret();
    try {
        const game = await gameRetriever.retrieveGame({gameId, memberSecret});
        return successResult(game);
    } catch (e) {
        console.error(e);
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
        await setSecret(gameId, memberSecret);
    } catch (e) {
        console.error(e);
        if (e instanceof MemberAlreadyExistsException) {
            return errorResult('MEMBER_ALREADY_EXISTS', 'Ya existe un participante con ese nombre');
        } else {
            return unknownErrorResult();
        }
    }
    return successResult();
}

export async function resolveGame(gameId: string): Promise<Result<void>> {
    const memberSecret = await getSecret() || '';
    try {
        await gameResolver.resolveGame({gameId, memberSecret});
    } catch (e) {
        console.error(e);
        if (e instanceof GameNotFoundException) {
            return errorResult('GAME_NOT_FOUND', 'No se encontró el juego');
        } else {
            return unknownErrorResult();
        }
    }
    return successResult();
}

export async function updateMembersToAvoid(gameId: string, membersToAvoid: string[]): Promise<Result<void>> {
    const memberSecret = await getSecret() || '';
    try {
        await membersToAvoidUpdater.updateMembersToAvoid({gameId, memberSecret, membersToAvoid});
    } catch (e) {
        console.error(e);
        if (e instanceof GameNotFoundException) {
            return errorResult('GAME_NOT_FOUND', 'No se encontró el juego');
        } else if (e instanceof TooManyMembersToAvoidException) {
            return errorResult('TOO_MANY_MEMBERS_TO_AVOID', 'No se pueden evitar tantos participantes');
        } else {
            return unknownErrorResult();
        }
    }
    redirect(`/${gameId}`);
}

async function setSecret(gameId: string, secret: string) {
    const cookieStore = await cookies();
    cookieStore.set('secret', encrypt(secret), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: `/${gameId}`,
        maxAge: 60 * 60 * 24 * 7,
    });
}

async function getSecret(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const encryptedSecret = cookieStore.get('secret')?.value;
    if (encryptedSecret) {
        return decrypt(encryptedSecret);
    }
    return undefined;
}
