import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { GameSetup } from "../interfaces/game.interface";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConnection";

const db = FIREBASE_DB;
const auth = FIREBASE_AUTH;

export async function getUserGames(userId: string) {
    try {
        const gameSettingsRef = collection(db, "users", userId, "gameSettings");
        const query = await getDocs(gameSettingsRef);

        const games: GameSetup[] = query.docs.map(doc => doc.data() as GameSetup)

        return games;
    } catch (err) {
        console.error('Error fetching games', err);
        return [];
    }
}

export async function createGame(userId: string, gameSetup: GameSetup) {
    const userRef = doc(db, 'users', userId);
    const gameSettingsRef = doc(userRef, 'gameSettings', gameSetup.gameName);
    console.log('Saving game setup...');

    try {
        const existingDoc = await getDoc(gameSettingsRef);
        if (existingDoc.exists()) {
            console.error('Game setup with this name already exists!');
            return; // Abortar a operação se já existir um jogo com o mesmo nome
        }

        await setDoc(gameSettingsRef, gameSetup);
    } catch (e) {
        console.error('Error saving game setup:', e);
    }
}