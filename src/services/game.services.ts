import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { GameSetup } from "../interfaces/game.interface";
import { FIREBASE_DB } from "../../firebaseConnection";

const db = FIREBASE_DB;

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

    try {
        const existingDoc = await getDoc(gameSettingsRef);
        if (existingDoc.exists()) {
            throw Error('Já existe um Game Setup com esse nome!');
        }
        await setDoc(gameSettingsRef, gameSetup);
    } catch (err) {
        throw err;
    }
}

export async function deleteGame(userId: string, gameName: string) {
    try {
        const gameDocRef = doc(db, 'users', userId, 'gameSettings', gameName);
        await deleteDoc(gameDocRef);
    }
    catch (err) {
        throw err;
    }
    
}

export async function updateGame(userId: string, updatedData: GameSetup) {
    try {
        const gameDocRef = doc(db, 'users', userId, 'gameSettings', updatedData.gameName);
        await setDoc(gameDocRef, { ...updatedData });
    }
    catch (err) {
        throw err;
    }
}