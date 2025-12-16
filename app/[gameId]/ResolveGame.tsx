'use client';

import { resolveGame } from "@/app/actions";
import Button from "@/components/Button";
import { isError } from "@/lib/result";
import { useState } from "react";

export default function ResolveGame({ gameId }: { gameId: string }) {
    const [confirming, setConfirming] = useState(false);

    if (confirming) {
        return (
            <div className="flex flex-col items-center gap-2 mt-6 animate-fade-in">
                <span className="text-sm font-bold text-secondary uppercase tracking-widest">¿Seguro? No hay vuelta atrás</span>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setConfirming(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        size="sm"
                        variant="primary"
                        onClickWithLoading={async () => {
                            const result = await resolveGame(gameId);
                            if (isError(result)) {
                                alert(result.errorMessage);
                                setConfirming(false);
                            }
                        }}
                    >
                        Sí, repartir
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <Button
            type="button"
            className="mt-8 block mx-auto w-full md:w-auto min-w-[200px]"
            variant="accent"
            size="lg"
            onClick={() => setConfirming(true)}
        >
            Realizar reparto 🎲
        </Button>
    );
}