'use client';

import React from 'react';
import { inmuebles } from '@/utils/inmuebles';
import { RiEyeLine, RiDeleteBinLine } from 'react-icons/ri';

const SavedSeachPage = () => {
    return (
        <div className='p-6'>
            <div className='bg-white shadow-md rounded-2xl'>
                <table className='w-full'>
                    <thead className='bg-black text-white'>
                        <tr>
                            <th className='p-4'>TITULO</th>
                            <th className='p-4'>FECHA</th>
                            <th className='p-4'>ACCION</th>
                        </tr>
                    </thead>
                    <tbody className='text-center justify-center'>
                        {inmuebles.map((inmueble) => (
                            <tr key={inmueble.id} className='border-t'>
                                <td className='p-4 text-gray-500'>
                                    {inmueble.tipo}
                                </td>
                                <td className='p-4 text-gray-500'>
                                    {inmueble.fecha}
                                </td>
                                <td className='p-4 flex space-x-4'>
                                    <button className='text-green-500 hover:text-green-700'>
                                        <RiEyeLine size={24} />
                                    </button>
                                    <button className='text-red-500 hover:text-red-700'>
                                        <RiDeleteBinLine size={24} />
                                    </button>
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

export default SavedSeachPage;
