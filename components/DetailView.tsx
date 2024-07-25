import React from 'react';
import GoogleMapReact from 'google-map-react';
import { FaTimes } from "react-icons/fa";

const Marker = ({ lat, lng, text }: { lat: number, lng: number, text: string }) => (
    <div className="text-red-500">{text}</div>
);

const DetailView = ({ inmueble, onClose }: { inmueble: any, onClose: () => void }) => {
    const { lat, lng } = inmueble.coordenadas;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
                <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">{inmueble.tipo}</h2>
            <p className="text-gray-600 mb-4">{inmueble.descripcion}</p>
            <div className="h-64 w-full">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={{ lat, lng }}
                    defaultZoom={15}
                >
                    <Marker lat={lat} lng={lng} text="📍" />
                </GoogleMapReact>
            </div>
            <p className="text-gray-600 mt-4">{inmueble.ubicacion}</p>
        </div>
    );
}

export default DetailView;
