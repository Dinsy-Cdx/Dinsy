import React from 'react';
import Image from 'next/image';
import { FaBuilding } from 'react-icons/fa6';
import { GiCoins } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
export interface CardProps {
  id: number;
  tokens: string;
  tokensImage: string;
  builderPool: string;
  roi: string;
  discount: string;
  plan: string;
}

export const PlanesInversionCard: React.FC<CardProps> = ({ tokens, tokensImage, builderPool, roi, discount, plan }: CardProps) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap sm:flex-nowrap justify-center items-center gap-16 py-12 px-4 bg-dark text-white  h-[100vh] sm:h-screen">
      

      <div className="flex flex-col flex-wrap md:flex-row justify-center items-center lg:grid-cols-4 gap-2 md:gap-8 ">
        <div className='flex flex-row md:flex-col  items-center p-6 bg-gray-800 rounded-xl shadow-md'>
          <GiCoins size={130} className='pt-3 hidden sm:flex'/>
          <div>
          <p className=" text-center text-lg  md:mt-4">{tokens}</p>
          <h3 className=" text-sm md:text-xl font-normal md:font-semibold">Tokens</h3>
          </div>
        </div>

        <div className='flex flex-col items-center p-6 bg-gray-800 gap-6 rounded-xl shadow-md'>
          <FaBuilding size={130} className="pt-3 hidden sm:flex "/>
          <div>
          <h3 className="text-center text-lg font-normal md:font-semibold">Builder Pool</h3>
          <p className="text-center text-sm mt">{builderPool}</p>
          </div>
        </div>

        <div className='flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-md'>
          <IoStatsChartSharp size={130} className='hidden text-white sm:flex'/>
          <h3 className="text-sm md:text-xl text-center font-normal md:font-semibold md:mt-4">Acceso a propiedades</h3>
          <p className="text-center text-lg mt-2">ROI {roi} trimestral</p>
        </div>

        <div className='flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-md'>
          <RiDiscountPercentFill size={130} className='hidden sm:flex' />
          <h3 className=" text-sm md:text-xl font-normal md:font-semibold md:mt-4">Descuento</h3>
          <p className="text-center text-sm md:text-lg ">{discount}</p>
        </div>
      </div>
    </div>
  )
}
