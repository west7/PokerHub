import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { Player } from "../interfaces/player.interface";
import { FIREBASE_DB } from "../firebaseConnection";

const db = FIREBASE_DB;

export async function getUserPlayers(userId: string) {
    try {
        const playersRef = collection(db, "users", userId, "players");
        const query = await getDocs(playersRef);

        const players: Player[] = query.docs.map((doc) => ({
            ...doc.data() as Player,
            playerId: doc.id,
        }));

        return players;

    } catch (err) {
        console.error('Error fetching games', err);
        return [];
    }
}

export async function createPlayer(userId: string, player: Player): Promise<string | null> {
    const userRef = doc(db, 'users', userId);
    const playersCollectionRef = collection(userRef, 'players');

    try {
        const playerRef = await addDoc(playersCollectionRef, {
            name: player.name,
            totalBalance: player.totalBalance,
            gamesPlayed: player.gamesPlayed,
            gamesWon: player.gamesWon,
            lastTransaction: null,
        });

        await updateDoc(playerRef, { playerId: playerRef.id });

        return playerRef.id;
    }
    catch (e) {
        console.error('Error saving player:', e);
        return null;
    }
}

export async function deletePlayer(userId: string, playerId: string) {
    try {
        const playerDocRef = doc(db, 'users', userId, 'players', playerId);
        await deleteDoc(playerDocRef);
    }
    catch (err) {
        console.error('Error deleting game', err);
    }

}

export async function updatePlayer(userId: string, player: Player) {
    try {
        console.log('Updating player:', player.playerId);
        const playerDocRef = doc(db, 'users', userId, 'players', player.playerId);
        await setDoc(playerDocRef, {
            name: player.name,
        }, {merge: true});
    }
    catch (err) {
        console.error('Error updating game', err);
    }
}    