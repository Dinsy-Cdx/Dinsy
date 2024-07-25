"use client";
import React, { useEffect, useState } from "react";
import { Label, LabelInputContainer } from "../../../components/ui/label";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { Input } from "../../../components/ui/input";
import Link from "next/link";
import { useAuth } from '@/app/context/AuthContext';

const AjustesPage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Actualizar el contexto del usuario con los nuevos datos
      console.log("User data updated successfully");

    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-800">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 flex justify-center">
        Editar y Actualizar
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">Nombres</Label>
            <Input id="firstName" placeholder="Pedro" type="text" value={formData.firstName} onChange={handleInputChange} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Apellidos</Label>
            <Input id="lastName" placeholder="Suárez" type="text" value={formData.lastName} onChange={handleInputChange} />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" placeholder="micorreo@gmail.com" type="email" value={formData.email} onChange={handleInputChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNumber">Número Telefónico</Label>
          <Input id="phoneNumber" placeholder="+51 987 654 321" type="number" value={formData.phoneNumber} onChange={handleInputChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" placeholder="••••••••••••" type="password" value={formData.password} onChange={handleInputChange} />
        </LabelInputContainer>
        <div className="flex flex-row justify-between flex-wrap my-2">
          <p>¿Quieres cambiar tu contraseña? <Link className="text-blue-500" href={"/ajustes"}>Click Aquí</Link></p>
          <Link className="text-blue-500" href={"/ajustes"}>Cambiar contraseña</Link>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Enviar
            <BottomGradient />
          </button>
          <button
            className="bg-gradient-to-br hover:text-rose-700 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="reset"
          >
            Cancelar
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AjustesPage;
