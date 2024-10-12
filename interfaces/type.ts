import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GameSetup } from "./game.interface";

export type RootStackParamList = {
    Home: undefined;
    GameSettings: undefined;
    Players: undefined;
    History: undefined;
    Statistics: undefined;
    CreateGame?: {gameSetup: GameSetup}; 
};

export type NavProps = NativeStackNavigationProp<RootStackParamList, 'GameSettings'>;
