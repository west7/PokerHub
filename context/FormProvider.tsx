import React, { createContext, useContext, useState } from "react";
import { BlindLevel } from "../interfaces/game.interface";

interface FormProviderProps {
    children: React.ReactNode;
}

interface FormData {
    gameName: string;
    numberOfWinners: string;
    prizeDistribution: string;
    numberOfLevels: string;
    timeForLevel: string;
    blindLevels: BlindLevel[];
}

interface FormContextProps {
    formData: FormData;
    updateFormData: (field: string, value: string | BlindLevel[]) => void;
    updateBlindLevel: (index: number, field: 'smallBlind' | 'bigBlind', value: string) => void;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

export default function FormProvider({ children }: FormProviderProps) {
    const [formData, setFormData] = useState({
        gameName: '',
        numberOfWinners: '',
        prizeDistribution: '',
        numberOfLevels: '',
        timeForLevel: '',
        blindLevels: [{ level: 1, smallBlind: '', bigBlind: '' }],
    })

    const updateFormData = (field: string, value: string | BlindLevel[]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const updateBlindLevel = (index: number, field: 'smallBlind' | 'bigBlind', value: string) => {
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
    };

    return (
        <FormContext.Provider value={{formData, updateFormData, updateBlindLevel}}>
            {children}
        </FormContext.Provider>
    );
}