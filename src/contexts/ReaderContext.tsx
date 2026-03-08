import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ReaderContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const ReaderProvider = ({ children }: { children: ReactNode }) => {
    const [fontSize, setFontSizeState] = useState<number>(() => {
        const saved = localStorage.getItem('readerFontSize');
        return saved ? parseInt(saved, 10) : 18;
    });

    const setFontSize = (size: number) => {
        setFontSizeState(size);
        localStorage.setItem('readerFontSize', size.toString());
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`);
    }, [fontSize]);

    return (
        <ReaderContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </ReaderContext.Provider>
    );
};

export const useReader = () => {
    const context = useContext(ReaderContext);
    if (!context) throw new Error('useReader must be used within a ReaderProvider');
    return context;
};
