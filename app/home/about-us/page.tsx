"use client";
import Image from 'next/image';
import React from 'react';
import { RiHomeHeartFill, RiBuilding4Fill, RiCommunityFill, RiGovernmentLine, RiCheckboxCircleFill } from "react-icons/ri";
import { PlanesTab } from "@/components/ui/PlanesTab";
import { PromotionCard } from "@/components/PromotionCard";
import Link from 'next/link';

export default function AboutUsPage() {

	return (

		<div className='bg-black pt-36 flex gap-12 '>
			<div className=" flex flex-col gap-10 justify-between text-white h-full">
				<section className="flex flex-col md:flex-row items-center justify-between h-[70%] w-full p-10 bg-black text-white">
					<div className="flex-1">
						<h2 className="text-5xl font-bold">¿Qué es DINSY?</h2>
						<p className="mt-4 text-lg">
							DINSY es el primer sistema inmobiliario descentralizado en Perú, desarrollado en la red BNB Smart
							Chain, que facilita la obtención de bienes inmuebles
							y proporciona regalías, plusvalía y otros beneficios
							para los participantes del ecosistema de DINSY.
						</p>
						
						<Link href={"/home#faq"} className="mt-6 px-6 w-44 py-3 bg-[#2bb8c1] hover:bg-[#1c6163] text-white rounded-full flex items-center">
							LEARN MORE
							<RiCheckboxCircleFill className="ml-2" />
						</Link>
					</div>
					<div className=" hidden  sm:flex max-w-[45%] ">
						<Image
							src="/images/logo.png"
							alt="CODE X INNOVA SAC"
							layout="responsive"
							width={500}
							height={300}
							style={{ objectFit: 'contain' }}
						/>
					</div>
				</section>

				<section id='objetivos' className="flex flex-col justify-between items-center h-full w-full p-10 gap-40 bg-black text-white">

					<div className="flex flex-col sm:flex-row gap-16 w-full items-center justify-center p-4 text-justify md:mb-0">
						<div className='md:w-1/3'>
						<h2 className="text-5xl text-center font-bold">Objetivo</h2>
						<p className="text-lg  mt-4">
							En DINSY nos enfocaremos a crear oportunidad de adquisición inmobiliaria.
						</p>
						<p className="text-lg mt-2">vivienda / oficina / casa / campo / negocios</p>
						<p className="text-lg mt-2">
							por darles una rentabilidad constante según el tipo de propiedades a elegir por cada usuario.
						</p>
						</div>
						<ul className="mt-6 space-y-4">
							<li className="flex items-center text-lg">
								<RiCheckboxCircleFill className="text-green-500 mr-2" />
								Seguridad
							</li>
							<li className="flex items-center text-lg">
								<RiCheckboxCircleFill className="text-green-500 mr-2" />
								Trazabilidad y Transparencia
							</li>
							<li className="flex items-center text-lg">
								<RiCheckboxCircleFill className="text-green-500 mr-2" />
								Sostenibilidad
							</li>
							<li className="flex items-center text-lg">
								<RiCheckboxCircleFill className="text-green-500 mr-2" />
								Facilidad de Inversión
							</li>
							<li className="flex items-center text-lg">
								<RiCheckboxCircleFill className="text-green-500 mr-2" />
								Innovación
							</li>
							<li className="flex items-center text-lg">
								<RiCheckboxCircleFill className="text-green-500 mr-2" />
								Legalidad
							</li>
							
						</ul>
					</div>

					<div className="flex flex-col items-center justify-center w-full py-16 bg-black pr-4 text-white">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-3/4">
							<div className="flex items-center space-x-4">
								<RiHomeHeartFill className="text-6xl" />
								<div>
									<h3 className="text-2xl font-semibold">Seguridad</h3>
									<p className="text-lg">
										Mayor seguridad en tus inversiones, evitando estafas.
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<RiBuilding4Fill className="text-6xl" />
								<div>
									<h3 className="text-2xl font-semibold">Trazabilidad y Transparencia</h3>
									<p className="text-lg">
										Transacciones con total trazabilidad y transparencia.
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<RiCommunityFill className="text-6xl" />
								<div>
									<h3 className="text-2xl font-semibold">Facilidad de Inversión</h3>
									<p className="text-lg">
										Invierte sin procesos engorrosos desde montos reducidos.
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<RiGovernmentLine className="text-6xl" />
								<div>
									<h3 className="text-2xl font-semibold">Innovación</h3>
									<p className="text-lg">
										Participa en un modelo de negocio innovador y rentable.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="flex h-[90vh] md:h-[110vh] flex-col  px-10 md:py-0">
					<PlanesTab />
				</section>
				<section className="flex flex-col md:items-center justify-center min-h-screen w-screen gap-12 p-4 md:p-10 pt-20 md:pt-0 text-white">
					<PromotionCard />
				</section>
			</div>
		</div >
	);
};

