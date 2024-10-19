import { GameSetup } from "./game.interface";
import { Player } from "./player.interface";

export interface Match {
    matchId: string;
    gameSetup: GameSetup;
    players: Player[]; 
    duration: number;
    date: Date;
    winners: Player[] | null;
    totalPrize: number;
    numberOfRounds: number;
} // Algo mais?