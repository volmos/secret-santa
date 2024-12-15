'use client';

import {useEffect} from "react";
import {setUrlSecret} from "@/app/actions";

export default function UrlSecret({gameId, secret}: { gameId: string, secret?: string }) {
    useEffect(() => {
        if (secret) {
            setUrlSecret(gameId, secret);
        }
    }, [gameId, secret]);
    return null;
}
