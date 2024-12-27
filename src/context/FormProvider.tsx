import React, { createContext, useContext, useState } from "react";
import { BlindLevel } from "../interfaces/game.interface";
import { GameSetup } from "../interfaces/game.interface";
interface FormProviderProps {
    children: React.ReactNode;
}
interface FormContextProps {
    formData: GameSetup;
    updateFormData: (field: string, value: string | BlindLevel[]) => void;
    resetFormData: () => void;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

export function useForm() {
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error('formContext must be used within a FormProvider');
    }
    return formContext;
}

export default function FormProvider({ children }: FormProviderProps) {
    const initialFormData: GameSetup = {
        gameName: '',
        numberOfWinners: '',
        prizeDistribution: '',
        numberOfLevels: '1',
        timeForLevel: '',
        blindLevels: [{ level: 1, smallBlind: '', bigBlind: '' }],
    };

    const [formData, setFormData] = useState<GameSetup>(initialFormData);

    const updateFormData = (field: string, value: string | BlindLevel[]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

   /*  const updateBlindLevel = (index: number, field: 'smallBlind' | 'bigBlind', value: string) => {
        setFormData(prev => {
            // Verifica se o índice está dentro dos limites do array
            if (index < 0 || index >= prev.blindLevels.length) {
                console.error(`Blind level at index ${index} does not exist.`);
                return prev; // Retorna sem fazer alterações se o nível não existe
            }

            // Cria uma cópia dos níveis de blinds e atualiza o campo
            const updatedBlindLevels = [...prev.blindLevels];
            updatedBlindLevels[index] = { ...updatedBlindLevels[index], [field]: value };

            return { ...prev, blindLevels: updatedBlindLevels };
        });
    }; */

    const resetFormData = () => {
        setFormData(initialFormData);
    };

    return (
        <FormContext.Provider value={{formData, updateFormData, resetFormData}}>
            {children}
        </FormContext.Provider>
    );
}