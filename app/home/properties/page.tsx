// export default function Properties() {
// 	return (
// 		<div className="text-white text-center h-full pt-48 pb-64 bg-black">
// 			<div className="container mx-auto">

// 				{/* Security – Equity token */}
// 				<div className="mb-8">
// 					<h2 className="text-xl font-bold mb-2">Security – Equity token</h2>
// 					<p className="mb-1">Equity Token: CDX-INNOVA 1,000,000</p>
// 					<p className="mb-1">Investors: Inv. 000000</p>
// 					<p className="text-blue-400">PROXIMAMENTE</p>
// 				</div>

// 				{/* CDX-Inmobiliaria */}
// 				<div className="mb-8">
// 					<h2 className="text-xl font-bold mb-2">CDX-Inmobiliaria</h2>
// 					<p className="mb-1">Equity Tokens: CDX 9,999,999</p>
// 					<p className="mb-1">Investors: Inv. 000000</p>
// 					<button className="text-blue-400 hover:text-blue-500">VIEW PROJECT</button>
// 				</div>

// 				{/* Assistant S.A.R.A. */}
// 				<div className="mb-8">
// 					<h2 className="text-xl font-bold mb-2">Assistant S.A.R.A.</h2>
// 					<p className="mb-1">Utility Tokens: U-CDX 10,000.00</p>
// 					<p className="mb-1">Investors: Inv 000000</p>
// 					<button className="text-blue-400 hover:text-blue-500">VIEW PROYECT</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
import { pasosTokenizacion } from '@/utils/pasosTokenizacion';
import React from 'react';
import Image from 'next/image';



const Properties = () => {
    return (
        // <div className=" py-24 px-8 mx-auto my-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className=" py-32 px-8 mx-auto grid grid-cols-2 md:grid-cols-4 justify-center gap-8">
            {pasosTokenizacion.map((Paso) => (
                <div key={Paso.id} className="rounded-lg overflow-hidden shadow-lg">
                    {/* <img src={Paso.image} alt={`Tutorial para la tokenizacion`} className="w-full h-64 object-cover object-center" /> */}
                    <Image 
					 src={Paso.image} 
					 alt={'Tutorial para tokenizacion'} 
					 width={200}
					 height={200}/>
					<div className="p-4">
                        <p className="text-lg font-semibold mb-2">Paso {Paso.id + 1}</p>
                        <p className="text-sm text-gray-500">{Paso.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Properties;
