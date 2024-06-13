"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { RiSearchLine, RiNotification3Fill, RiSunFill } from "react-icons/ri";
import { useAuth } from '@/app/context/AuthContext';

const UserNavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const { user } = useAuth();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between bg-background">

      <div className="md:hidden flex items-center justify-center w-full md:h-full">
        <button
          className="flex text-white font-bold bg-[#0EA5E9] rounded-full shadow-lg p-4 z-50"
          onClick={toggleMenu}
        >
          Show
        </button>
        {menuVisible && (
          <div className="absolute top-[80px] left-0 w-full bg-background shadow-lg rounded-lg p-4 z-50 ">
            <div className='flex flex-col items-center justify-center z-50 bg-black  bg-opacity-85 backdrop-blur h-screen gap-2.5'>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard"}>Dashboard</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/perfil"}>Perfil</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/suscripcion"}>Suscripcion</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/ajustes"}>Horario</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/properties"}>Mis Propiedades</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/add-propertie"}>Añadir Propiedad</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/favorite"}>Favoritos</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/saved-search"}>Busqueda Guardada</Link>
              <Link className='bg-zinc-900 p-3 rounded-full' href={"/dashboard/review"}>Comentarios</Link>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block md:h-8 text-[20px] px-3 text-white font-bold">
        <h1>Dashboard</h1>
      </div>

      <div className="flex gap-x-3 items-center pr-5">
        <div className=" hidden sm:block relative">
          <RiSearchLine className="absolute left-2 top-3 text-zinc-400" />
          <input
            type="text"
            name="search"
            className="  py-2 pl-8 pr-4 bg-zinc-800 border-[1px] text-white border-zinc-600 focus:border-zinc-300 outline-none rounded-2xl"
            placeholder="Search here..."
          />
        </div>
        <div className="rounded-full w-[45px] h-[45px] bg-zinc-700 flex items-center justify-center cursor-pointer">
          <RiNotification3Fill className="text-[20px] text-white" />
        </div>
        <div className="rounded-full w-[45px] h-[45px] bg-zinc-700 flex items-center justify-center cursor-pointer mr-[10px]">
          <RiSunFill className="text-[20px] text-white" />
        </div>
        <div className="border-l-[2px] border-zinc-700 flex items-center justify-center pl-3">
          Hola {user ? user.username : 'Invitado'}
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;