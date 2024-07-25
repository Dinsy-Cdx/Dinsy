"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const updateUser = (user: any) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <AuthContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
