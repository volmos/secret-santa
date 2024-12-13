import {Game} from "@/context/domain/Game";
import {GameId} from "@/context/domain/GameId";

export interface GameRepository {

    insert(game: Game): Promise<void>;

    get(id: GameId): Promise<Game | null>;

    update(game: Game): Promise<void>;

}