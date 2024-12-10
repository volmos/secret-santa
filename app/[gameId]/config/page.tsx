import {getGame} from "@/app/actions";
import GameConfig from "@/app/[gameId]/config/GameConfig";

export default async function GameConfigPage({
                                                 params,
                                                 searchParams
                                             }: {
    params: Promise<{ gameId: string }>,
    searchParams: Promise<{ secret?: string }>
}) {
    const {gameId} = await params;
    const {secret} = await searchParams;
    const game = await getGame(gameId, secret);
    return (
        <main className="flex-grow flex flex-col">
            <GameConfig gameId={gameId} members={game.members} me={game.me} isResolved={game.isResolved}/>
        </main>
    );
}
