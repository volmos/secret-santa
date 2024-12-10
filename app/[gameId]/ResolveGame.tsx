'use client';

import {resolveGame} from "@/app/actions";
import Button from "@/components/Button";

export default function ResolveGame({gameId, secret}: { gameId: string, secret: string }) {
    return (
        <Button type="button" className="mt-4 block mx-auto" onClickWithLoading={() => resolveGame(gameId, secret)}>
            Realizar reparto
        </Button>
    );
}