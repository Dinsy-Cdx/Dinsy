"use client";

import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { FaEthereum } from 'react-icons/fa';
import { useAuth } from '@/app/context/AuthContext';

declare const ethereum: any;

interface LoginProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setShowForm }) => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null);
    const { setUser } = useAuth();

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleWalletConnect = async () => {
        try {
            if (ethereum && ethereum.selectedAddress) {
                await ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            const user = await checkIfWalletRegistered(accounts[0]);
            if (user) {
                setUser(user);
                setAlert({ type: 'success', message: 'Login successful!' });
                window.location.href = '/dashboard';
            } else {
                setAlert({ type: 'warning', message: 'Cuenta no registrada, Registrate' });
            }
        } catch (error) {
            console.log(error);
            setAlert({ type: 'error', message: 'Error connecting to wallet. Please try again.' });
        }
    };

    const checkIfWalletRegistered = async (wallet: string) => {
        try {
            const response = await fetch(`/api/auth?wallet=${wallet}`);
            if (!response.ok) {
                throw new Error('Failed to check wallet registration');
            }
            const data = await response.json();
            console.log('API response:', data);
            if (data.isRegistered) {
                return data.user;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            setAlert({ type: 'error', message: 'Failed to check wallet registration' });
            return null;
        }
    };

    return (
        <div>
            <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-teal-300 opacity-40 rounded-xl -z-10"></div>
                <h2 className="text-4xl font-bold text-center text-teal-600 mb-6">Inicia Sesión</h2>
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaEthereum className="text-white text-3xl" />
                    </div>
                </div>
                <button
                    onClick={handleWalletConnect}
                    className="w-full px-4 py-2 my-2 rounded-md text-lg font-semibold bg-teal-600 text-white hover:bg-teal-700 flex items-center justify-center gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                    <FaEthereum />
                    Ingresa con Metamask
                </button>
                <div className="mt-6 text-center">
                    <a
                        href="#"
                        className="text-lg text-teal-500 hover:underline hover:text-teal-700 transition duration-300"
                        onClick={() => setShowForm(true)}
                    >
                        No tienes cuenta? Registrate
                    </a>
                </div>
                {alert && (
                    <Stack sx={{ width: '100%' }} spacing={2} className="mt-6">
                        <Alert severity={alert.type} className="bg-white text-black">
                            {alert.message}
                        </Alert>
                    </Stack>
                )}
            </div>
        </div>
    );
};

export default Login;
