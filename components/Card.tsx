import React from 'react';
import Image from 'next/image';
import { FaHeart } from "react-icons/fa6";

const formatPriceToTokens = (price: any) => {
    const numberPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    const tokens = numberPrice / 50;

    const formatTokens = (value: number) => {
        if (value % 1 === 0) {
            return value.toFixed(0);
        } else {
            return value.toFixed(2);
        }
    }

    if (tokens >= 1000000) {
        return `${formatTokens(tokens / 1000000)} Millones Tokens`;
    } else if (tokens >= 1000) {
        return `${formatTokens(tokens / 1000)} Mil Tokens`;
    } else {
        return `${formatTokens(tokens)} Tokens`;
    }
}

const Card = ({ inmueble, onDetailClick }: { inmueble: any, onDetailClick: () => void }) => {
    const tokenPrice = formatPriceToTokens(inmueble.precio);

    return (
        <div className="bg-gradient-to-br from-[#2F2D8E] to-[#0E0548] shadow-2xl rounded-xl overflow-hidden w-[320px] md:w-[400px] flex flex-col">
            <div className="relative">
                <Image
                    alt="inmueble"
                    src={inmueble.imagen}
                    quality={100}
                    width={300}
                    height={200}
                    className="object-cover w-full"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-2 shadow-md text-white">
                    <FaHeart />
                </div>
            </div>
            <div className="p-4 flex-1 bg-white">
                <div className="text-center mb-4">
                    <h2 className="text-[#2F2D8E] text-xl font-semibold mb-1">{inmueble.tipo} EN VENTA</h2>
                    <p className="text-[#0E0548] font-bold text-lg">{tokenPrice} / {inmueble.precio}</p>
                </div>
                <p className="text-[#4B51E3] font-semibold mb-2">{inmueble.ubicacion}</p>
                <p className="text-[#2F2D8E] mb-4">{inmueble.descripcion}</p>
                <div className="flex flex-row justify-center flex-wrap gap-2 mb-4">
                    <p className="text-white text-sm font-semibold border rounded-full w-auto bg-[#39B8BD] p-0.5 px-2 text-center">Baños: {inmueble.baños}</p>
                    <p className="text-white text-sm font-semibold border rounded-full w-auto bg-[#39B8BD] p-0.5 px-2 text-center">Cuartos: {inmueble.habitaciones}</p>
                    <p className="text-white text-sm font-semibold border rounded-full w-auto bg-[#39B8BD] p-0.5 px-2 text-center">Área: {inmueble.area}</p>
                </div>
            </div>
            <div className="px-4 py-2 bg-[#2F2D8E] border-t flex flex-col md:flex-row justify-between items-center text-sm text-[#DFE3E8]">
                <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                    <p className="text-[#2F2D8E] text-sm font-semibold border rounded-full w-auto bg-[#DFE3E8] p-0.5 px-2 text-center">ROI: {inmueble.roi}%</p>
                    <p className="text-[#2F2D8E] text-sm font-semibold border rounded-full w-auto bg-[#DFE3E8] p-0.5 px-2 text-center">Participantes: {inmueble.participantes}</p>
                    <p className="text-[#2F2D8E] text-sm font-semibold border rounded-full w-auto bg-[#DFE3E8] p-0.5 px-2 text-center">Rent: ${inmueble.rent}</p>
                </div>
                <div className="flex-shrink-0">
                    <button className="text-[#39B8BD] font-semibold transition duration-300 hover:text-white" onClick={onDetailClick}>Detail</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
