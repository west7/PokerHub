import { FirebaseError } from "firebase/app";

export function FirebaseErrorCustomMessage (e: FirebaseError) : string {
    console.log(e.code)

    switch (e.code) {
        case 'auth/user-not-found':
            return 'Usuário não existe.'
        case 'auth/invalid-email':
            return 'Email inválido.'
        case 'auth/user-disabled':
            return 'Usuário desativado.'
        case 'auth/invalid-credential':
            return 'Email ou senha incorretos.'
        case 'auth/invalid-password':
            return 'Senha inválida.'
        case 'auth/email-already-exists' :
            return 'Email já cadastrado.'
        case 'auth/email-already-in-use':
            return 'Email já cadastrado.'
        case 'auth/weak-password':
            return 'Senha precisa de ao menos 6 caracteres.'
        default:
            return 'Ocorreu um erro. Tente novamente.'
    }
}