'use server';

import {generateUuid} from "@/lib/uuidUtil";
import {gameCreator, gameResolver, gameRetriever, memberAdder, membersToAvoidUpdater} from "@/context/context";
import {redirect, RedirectType} from "next/navigation";

export async function createGame(ownerName: string) {
    const gameId = generateUuid();
    const ownerSecret = generateUuid();
    await gameCreator.createGame({gameId, ownerName, ownerSecret});
    redirect(`/${gameId}?secret=${ownerSecret}`, RedirectType.replace);
}

export async function getGame(gameId: string, memberSecret?: string) {
    return await gameRetriever.retrieveGame({gameId, memberSecret});
}

export async function addMember(gameId: string, memberName: string) {
    const memberSecret = generateUuid();
    await memberAdder.addMember({gameId, memberName, memberSecret});
    redirect(`/${gameId}?secret=${memberSecret}`, RedirectType.replace);
}

export async function resolveGame(gameId: string, memberSecret: string) {
    await gameResolver.resolveGame({gameId, memberSecret});
}

export async function updateMembersToAvoid(gameId: string, memberSecret: string, membersToAvoid: string[]) {
    await membersToAvoidUpdater.updateMembersToAvoid({gameId, memberSecret, membersToAvoid});
    redirect(`/${gameId}?secret=${memberSecret}`);
}