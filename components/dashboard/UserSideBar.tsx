"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiUserFill, RiHeartFill, RiDashboardFill, RiLogoutCircleLine, RiSettings4Fill, RiHome3Fill, RiAddLine, RiCheckboxCircleFill, RiMessage3Fill } from "react-icons/ri";
import { TbDiamondFilled } from "react-icons/tb";
import Image from 'next/image';

const UserSideBar = () => {
    const pathname = usePathname();

    const handleLogout = () => {
        // Redirigir a la página de inicio de sesión
        window.location.href = '/home/auth';
    };

    const isActive = (path: string) => pathname === path ? 'bg-sky-500' : '';

    return (
        <>
            <div className="hidden md:block text-white rounded-lg shadow-lg h-screen w-[300px] md:visible overflow-hidden">
                <div className="flex flex-row md:flex-col items-center justify-center px-[20px] py-0">
                    <div className="h-[80px] flex gap-x-1 items-center justify-center w-full">
                        <Image src="/images/logo.png" width={100} height={100} className="drop-shadow-lg" alt="panda_logo" style={{ width: 'auto', height: 'auto' }}/>
                    </div>

                    <div className="w-full h-[calc(100vh-100px)] rounded-2xl bg-zinc-800 flex flex-col items-center justify-between gap-2 overflow-y-auto">
                        <div className="w-full flex flex-col items-center p-2">
                            <div className='w-full flex flex-col gap-y-2 border-b-[2px] border-zinc-700 pb-4 mb-4'>
                                <Link href={'/dashboard'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard')}`}>
                                    <RiHome3Fill />
                                    Dashboard
                                </Link>
                            </div>
                            <h4 className='font-bold text-gray-200 w-full text-left mb-2'>CUENTA</h4>
                            <div className='w-full flex flex-col gap-y-1 border-b-[2px] border-zinc-700 pb-4 mb-4'>
                                <Link href={'/dashboard/perfil'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/perfil')}`}>
                                    <RiUserFill />
                                    Perfil
                                </Link>
                                <Link href={'/dashboard/suscripcion'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/suscripcion')}`}>
                                    <TbDiamondFilled />
                                    Suscripcion
                                </Link>
                                <Link href={'/dashboard/ajustes'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/ajustes')}`}>
                                    <RiSettings4Fill />
                                    Ajustes
                                </Link>
                            </div>
                            <h4 className='font-bold text-gray-200 w-full text-left mb-2'>LISTA</h4>
                            <div className='w-full flex flex-col gap-y-1 border-b-[2px] border-zinc-700 pb-4 mb-4'>
                                <Link href={'/dashboard/properties'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/properties')}`}>
                                    <RiDashboardFill />
                                    Mis Propiedades
                                </Link>
                                <Link href={'/dashboard/add-propertie'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/add-propertie')}`}>
                                    <RiAddLine />
                                    Añadir Propiedad
                                </Link>
                                <Link href={'/dashboard/favorite'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/favorite')}`}>
                                    <RiHeartFill />
                                    Favoritos
                                </Link>
                                <Link href={'/dashboard/saved-search'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/saved-search')}`}>
                                    <RiCheckboxCircleFill />
                                    Busqueda Guardada
                                </Link>
                                <Link href={'/dashboard/review'} className={`w-full rounded-md flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer ${isActive('/dashboard/review')}`}>
                                    <RiMessage3Fill />
                                    Comentarios
                                </Link>
                            </div>
                            <div
                                onClick={handleLogout}
                                className='w-full flex gap-x-2 items-center p-2 px-3 cursor-pointer pb-4'
                            >
                                <RiLogoutCircleLine />
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSideBar;
