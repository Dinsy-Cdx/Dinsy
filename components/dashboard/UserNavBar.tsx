"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { RiSearchLine, RiNotification3Fill, RiSunFill } from "react-icons/ri";
import { useAuth } from '@/app/context/AuthContext';
import { GiHamburgerMenu } from 'react-icons/gi';

const UserNavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const { user } = useAuth();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between bg-[#0d0d0d] text-white">
      <div className="md:hidden flex items-center justify-center w-full">
        <button
          className="flex text-white font-bold bg-[#00FFFF] rounded-full shadow-lg p-4 z-50"
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </button>
        {menuVisible && (
          <div className="absolute top-[80px] left-0 w-full bg-[#0d0d0d] text-white shadow-lg rounded-lg p-4 z-50 overflow-y-auto">
            <div className='flex flex-col items-center pt-8 z-50 bg-[#0d0d0d] backdrop-blur h-screen gap-2.5 overflow-y-hidden'>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard"} onClick={handleLinkClick}>Dashboard</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/perfil"} onClick={handleLinkClick}>Perfil</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/suscripcion"} onClick={handleLinkClick}>Suscripcion</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/ajustes"} onClick={handleLinkClick}>Ajustes</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/properties"} onClick={handleLinkClick}>Mis Propiedades</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/add-propertie"} onClick={handleLinkClick}>Añadir Propiedad</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/favorite"} onClick={handleLinkClick}>Favoritos</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/saved-search"} onClick={handleLinkClick}>Busqueda Guardada</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/dashboard/review"} onClick={handleLinkClick}>Comentarios</Link>
              <Link className='hover:bg-[#1a1a1a] p-2 rounded-full text-[#00FFFF]' href={"/home/auth"} onClick={handleLinkClick}>Log-out</Link>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block md:h-8 text-[20px] px-3 text-[#00FFFF] font-bold">
        <h1>Dashboard</h1>
      </div>

      <div className="flex gap-x-3 items-center pr-5">
        <div className="hidden sm:block relative">
          <RiSearchLine className="absolute left-2 top-3 text-[#00FFFF]" />
          <input
            type="text"
            name="search"
            className="py-2 pl-8 pr-4 bg-[#1a1a1a] border-[1px] text-white border-[#333] focus:border-[#00FFFF] outline-none rounded-2xl"
            placeholder="Search here..."
          />
        </div>
        <div className="rounded-full w-[45px] h-[45px] bg-[#1a1a1a] flex items-center justify-center cursor-pointer">
          <RiNotification3Fill className="text-[20px] text-[#00FFFF]" />
        </div>
        <div className="rounded-full w-[45px] h-[45px] bg-[#1a1a1a] flex items-center justify-center cursor-pointer mr-[10px]">
          <RiSunFill className="text-[20px] text-[#00FFFF]" />
        </div>
        <div className="border-l-[2px] border-[#333] flex items-center justify-center pl-3 text-[#00FFFF]">
          Hola {user ? user.username : 'Invitado'}
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
