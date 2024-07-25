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
            // Intentar desconectar la cuenta actual primero
            if (ethereum && ethereum.selectedAddress) {
                await ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });
            }

            // Solicitar permisos de conexión
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            const user = await checkIfWalletRegistered(accounts[0]);
            if (user) {
                setUser(user); // Guardar los datos del usuario en el contexto
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
            if (data.isRegistered) {
                return data.user; // Asegúrate de que la respuesta de la API incluye todos los datos del usuario
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
        <div className="flex justify-center items-center h-full min-h-screen bg-gradient-to-r">
            <div className="w-full max-w-md mx-auto rounded-lg p-8 shadow-xl bg-gray-600 bg-opacity-90 backdrop-blur-lg">
                <h2 className="text-4xl font-bold text-center text-white mb-8">Inicia Sesión</h2>
                <button
                    onClick={handleWalletConnect}
                    className="w-full px-4 py-2 my-2 rounded-md text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <FaEthereum />
                    Ingresa con Metamask
                </button>
                <div className="mt-6 text-center">
                    <a
                        href="#"
                        className="text-lg text-blue-400 hover:underline hover:text-blue-100 transition duration-300"
                        onClick={() => setShowForm(true)}
                    >
                        No tienes cuenta? Registrate
                    </a>
                </div>
                {alert && (
                    <Stack sx={{ width: '100%' }} spacing={2} className="mt-6">
                        <Alert severity={alert.type}>{alert.message}</Alert>
                    </Stack>
                )}
            </div>
        </div>
    );
};

export default Login;
