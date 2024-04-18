import React, { Dispatch, createContext, useState } from "react";

export type OpenGiftId = string | null;

export type RegistryContextProps = {
    openGift?: OpenGiftId;
    setOpenGift?: Dispatch<React.SetStateAction<OpenGiftId>>;
};

type ProviderProps = {
    children: React.ReactNode;
};

export const RegistryContext = createContext<RegistryContextProps>({});

export function RegistryContextProvider({ children }: ProviderProps) {
    const [openGift, setOpenGift] = useState<OpenGiftId>(null);

    return (
        <RegistryContext.Provider
            value={{
                openGift,
                setOpenGift,
            }}
        >
            {children}
        </RegistryContext.Provider>
    );
}
