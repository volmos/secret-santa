import {getGame} from "@/app/actions";
import GameConfig from "@/app/[gameId]/config/GameConfig";
import {isError} from "@/lib/result";

export default async function GameConfigPage({params}: { params: Promise<{ gameId: string }> }) {
    const {gameId} = await params;
    const result = await getGame(gameId);
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
