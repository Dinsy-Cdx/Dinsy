'use client';

import React, { useState } from "react";
import Image from 'next/image';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/home#home", label: "Home" },
        { href: "/home#about", label: "Sobre Nosotros" },
        { href: "/home#faq", label: "FAQ" },
        { href: "/home/properties", label: "Propiedades" },
        { href: "/home/auth", label: "Ingresa" },
    ];

    return (
        <div className="w-full flex justify-between items-center p-4 bg-black bg-opacity-25 backdrop-blur-lg border border-white border-opacity-25 fixed z-50">
            <div className="flex justify-start items-center">
                <Image src="/images/logo.png" width={150} height={150} className="drop-shadow-lg" alt="logo" />
            </div>
            <ul className="hidden md:flex flex-1 justify-center items-center list-none">
                {navLinks.map((link) => (
                    <li key={link.href} className={`mx-4 cursor-pointer flex flex-col items-center text-sm md:text-lg ${pathname === link.href ? 'text-secondary' : 'text-gray-500'}`}>
                        <div className={`w-5/6 h-0.5 mb-1 rounded-full transition-all duration-350 ease-in-out ${pathname === link.href ? 'bg-secondary' : 'bg-transparent'}`}></div>
                        <Link href={link.href} className="uppercase font-medium transition-all duration-350 ease-in-out hover:text-secondary">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='flex md:hidden justify-center items-center w-9 h-9 rounded-full bg-black-200'>
                <HiMenuAlt4 className="w-4/5 h-4/5 text-white" onClick={() => setToggle(true)} />
                {
                    toggle && (
                        <motion.div
                            initial={{ x: 300 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                            className="fixed top-0 bottom-0 right-0 z-50 p-4 w-4/5 h-screen flex flex-col justify-end items-end bg-cover bg-repeat border border-gray-600 bg-black shadow-lg"
                        >
                            <HiX className="w-9 h-6 text-secondary mb-4 rounded-full bg-black-200" onClick={() => setToggle(false)} />
                            <ul className="list-none m-0 p-0 w-full h-full flex flex-col justify-start items-start">
                                {navLinks.map((link) => (
                                    <li key={link.href} className="m-4">
                                        <Link href={link.href} className={`text-lg uppercase font-medium transition-all duration-350 ease-in-out ${pathname === link.href ? 'text-secondary' : 'text-gray-500'} hover:text-secondary`} onClick={() => setToggle(false)}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                }
            </div>
        </div>
    );
};
