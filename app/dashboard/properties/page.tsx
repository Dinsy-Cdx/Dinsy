"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { inmuebles } from '@/utils/inmuebles';
import { RiEyeFill, RiShareForwardFill, RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';

const PropertiesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleActionClick = (id: any) => {
    setSelectedProperty(selectedProperty === id ? null : id);
  };

  return (
    <div className='p-6'>
      <div className='flex gap-2 md:justify-between items-center mb-4'>
        <p className='text-sm md:text-lg'>Showing 1-5 of 40 results</p>
        <div >
          <label>Short by:</label>
          <select className=' h-10 w-28 ml-2 border rounded px-2 py-1'>
            <option className='text-xs' >Newest</option>
          </select>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md'>
        <table className='w-full'>
          <thead className='bg-black text-white text-xs md:text-lg'>
            <tr>
              <th className=' p-2 md:p-4'>TITULO</th>
              <th className=' p-2 md:p-4'>FECHA</th>
              <th className=' p-2 md:p-4'>VISTAS</th>
              <th className=' p-2 md:p-4'>ESTADO</th>
              <th className=' p-2 md:p-4'>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {inmuebles.map((inmueble) => (
              <tr key={inmueble.id} className='border-t'>
                <td className='p-4 flex items-center'>
                  <div className='hidden md:flex'>
                  <Image src={inmueble.imagen} alt={inmueble.tipo} width={64} height={64} className='w-16 h-16 rounded mr-4' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-xs md:text-lg'>{inmueble.tipo}</h3>
                    <p className='text-xs md:text-lg text-gray-500'>{inmueble.ubicacion}</p>
                    <p className='text-xs md:text-lg font-bold'>{`$${inmueble.precio}`}</p>
                  </div>
                </td>
                <td className='p-4 text-xs md:text-lg text-gray-500'>
                  {inmueble.fecha}
                </td>
                <td className='p-4 text-xs md:text-lg text-gray-500'>
                  {inmueble.view}
                </td>
                <td className='p-4'>
                  <span className={`py-1 px-3 text-xs md:text-lg rounded-full ${inmueble.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {inmueble.status}
                  </span>
                </td>
                <td className='p-4 relative'>
                  <button className='text-gray-600' onClick={() => handleActionClick(inmueble.id)}>...</button>
                  {selectedProperty === inmueble.id && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
                      <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'>
                        <RiEyeFill className='mr-2' /> View
                      </button>
                      <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'>
                        <RiShareForwardFill className='mr-2' /> Share
                      </button>
                      <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'>
                        <RiEdit2Fill className='mr-2' /> Edit
                      </button>
                      <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'>
                        <RiDeleteBin2Fill className='mr-2' /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center items-center p-4'>
          <button className='px-4 py-2 mx-1 border rounded bg-black text-white'>1</button>
          <button className='px-4 py-2 mx-1 border rounded bg-gray-600 text-white'>2</button>
          <button className='px-4 py-2 mx-1 border rounded bg-gray-600 text-white'>3</button>
          <button className='px-4 py-2 mx-1 border rounded bg-gray-600 text-white'>4</button>
          <button className='px-4 py-2 mx-1 border rounded bg-gray-600 text-white'>Last →</button>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;