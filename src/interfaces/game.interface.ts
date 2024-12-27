export interface BlindLevel {
    level: number;
    smallBlind: string;
    bigBlind: string;
}

export interface GameSetup {
    gameName: string;
    numberOfWinners: string;
    prizeDistribution: string;
    numberOfLevels: string;
    timeForLevel: string;
    blindLevels: BlindLevel[];
}