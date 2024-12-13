import {getGame} from "@/app/actions";
import GameConfig from "@/app/[gameId]/config/GameConfig";
import {isError} from "@/lib/result";

export default async function GameConfigPage({
                                                 params,
                                                 searchParams
                                             }: {
    params: Promise<{ gameId: string }>,
    searchParams: Promise<{ secret?: string }>
}) {
    const {gameId} = await params;
    const {secret} = await searchParams;
    const result = await getGame(gameId, secret);
    if (isError(result)) {
        return null;
    }
    const game = result.data;
    return (
        <main className="flex-grow flex flex-col">
            <GameConfig gameId={gameId} members={game.members} me={game.me} isResolved={game.isResolved}/>
        </main>
    );
}
