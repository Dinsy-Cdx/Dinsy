"use client";

import React, { useState } from 'react';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const AuthPage = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen py-2">
            {showRegisterForm ? (
                <Register setShowForm={setShowRegisterForm} />
            ) : (
                <Login setShowForm={setShowRegisterForm} />
            )}
        </div>
    );
};

export default AuthPage;
