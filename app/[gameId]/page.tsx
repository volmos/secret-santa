import {getGame} from "@/app/actions";
import Game from "@/app/[gameId]/Game";
import {isError} from "@/lib/result";

export default async function GamePage({params, searchParams}: {
    params: Promise<{ gameId: string }>,
    searchParams: Promise<{ secret?: string }>
}) {
    const {gameId} = await params;
    const {secret} = await searchParams;
    const result = await getGame(gameId);
    if (isError(result)) {
        return null;
    }
    const game = result.data;
    return (
        <main className="flex-grow flex flex-col">
            <Game gameId={gameId} me={game.me} members={game.members} isResolved={game.isResolved}
                  result={game.result}/>
        </main>
    );
}
