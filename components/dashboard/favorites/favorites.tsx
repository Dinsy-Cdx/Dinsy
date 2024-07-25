import React from 'react'
import Image from 'next/image'
import { MdArrowOutward } from "react-icons/md";
import { LuHeart } from "react-icons/lu";

const Favorites = () => {
  return (
    <div className="relative w-auto p-4 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
      <div className="absolute top-4 right-4 z-50 p-1">
        <LuHeart size={20} />
      </div>
      <Image
        src={"/images/logo.png"}
        alt={"foto de la propiedad"}
        width={350}
        height={350}
        className='flex self-center'
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white">Blueberry villa</h2>
        <p className="text-white mt-2">
          Twin tower, Acapulco, Mexico
        </p>
        <div className='flex justify-between flex-row '>
          <p className="text-white">1370 sqft</p>
          <p className="text-white">04 bed</p>
          <p className="text-white">01 bath</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-white font-bold">$2,500 MXN/mes</p>
          <button className='rounded-ful flex'><MdArrowOutward size={20} /></button>
        </div>
      </div>
    </div>
  )
}

export default Favorites