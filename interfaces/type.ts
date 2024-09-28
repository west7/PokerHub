import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    GameSettings: undefined;
    Players: undefined;
    History: undefined;
    Statistics: undefined;
    CreateGame: undefined; // Adicione a rota de criação de jogo aqui
};

export type NavProps = NativeStackNavigationProp<RootStackParamList, 'GameSettings'>;
