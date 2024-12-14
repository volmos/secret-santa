'use client';

import {resolveGame} from "@/app/actions";
import Button from "@/components/Button";
import {isError} from "@/lib/result";

export default function ResolveGame({gameId}: { gameId: string }) {
    return (
        <Button type="button" className="mt-4 block mx-auto" onClickWithLoading={async () => {
            const result = await resolveGame(gameId);
            if (isError(result)) {
                alert(result.errorMessage);
            }
        }}>
            Realizar reparto
        </Button>
    );
}