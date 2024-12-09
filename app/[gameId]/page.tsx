import {getGame} from "@/app/actions";
import Game from "@/app/[gameId]/Game";

export default async function GamePage({
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
            <Game gameId={gameId} memberName={game.memberName} isOwner={game.isOwner}
                  members={game.members} secret={secret} isResolved={game.isResolved} result={game.result}/>
        </main>
    );
}
