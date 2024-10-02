export interface BlindLevel {
    level: number;
    smallBlind: string;
    bigBlind: string;
}

export interface GameSetup {
    name: string; 
    numWinners: number; 
    prizeDistribution: number[]; 
    blindLevelTime: number; 
    initialBlindLevels: number; 
    blindLevels: BlindLevel[]; 
}