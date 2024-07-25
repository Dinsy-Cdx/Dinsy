"use client";
import { CardStack } from "@/components/ui/CardStack";
import Image from 'next/image';
import React from 'react';
import { CardAboutUs } from '@/components/ui/CardAboutUs';
import { HoverEffect } from "@/components/ui/CardHoverEffect";
import { mercado } from "@/utils/mercado";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { metadata } from './metadata';

export default function AboutUsPage() {
	console.log('CardAboutUs data:', CardAboutUs);
	console.log('mercado data:', mercado);

	return (
		<section className="text-white">
			<div className="flex flex-col md:flex-row md:items-center w-full">
				<div className="flex-1">
					<Image
						src="/images/logo.png"
						alt="CODE X INNOVA SAC"
						layout="responsive"
						width={200}
						height={300}
						objectFit="cover"
					/>
				</div>

				<div className="flex-1">
					<h2 className="text-3xl font-bold">Whitepaper de CODE X INNOVA SAC</h2>
					<p className="mt-4">
						<span className="font-semibold">Introducción:</span> CODE X INNOVA SAC nació de la colaboración entre un economista boliviano y un desarrollador de software peruano, ambos expertos en sus respectivos campos. Participamos activamente en la escena tecnológica desde nuestros primeros días y nos consolidamos como una empresa líder en tecnologías emergentes.
					</p>
					<p className="mt-4">
						Hemos participado en eventos clave, incluida la Hackathon en Perú en 2022, donde alcanzamos el tercer puesto. Este logro respalda nuestra dedicación a la excelencia técnica y la capacidad para destacarnos en entornos altamente competitivos.
					</p>
					<p className="mt-4">
						Inicialmente trabajamos con la red Binance Smart Chain (BNB Chain), pero hoy, para ofrecer soluciones más escalables y eficientes, nos hemos trasladado a la tecnología de Algorand, que nos brinda una base robusta y segura para nuestras operaciones.
					</p>
				</div>
			</div>
			<div className="flex flex-col md:flex-row md:items-center w-full">
				<div className="flex-1">
					<Image
						src="/images/logo.png"
						alt="CODE X INNOVA SAC"
						layout="responsive"
						width={900}
						height={300}
						objectFit="cover"
					/>
				</div>

				<div className="flex-1">
					<h2 className="text-3xl font-bold">Problema</h2>
					<p className="mt-4">
						Dificultad de acceso a capital para invertir en bienes raìces.
					</p>
					<p className="mt-4">
						Miles de personas son estafadas cada año.
					</p>
					<p className="mt-4">
						Desconocimiento del mercado inmobiliario.
					</p>
				</div>
			</div>
			<div>
				<div className="flex flex-col md:flex-row md:items-center w-full">
					<div className="flex-1">
						<Image
							src="/images/logo.png"
							alt="CODE X INNOVA SAC"
							layout="responsive"
							width={900}
							height={300}
							objectFit="cover"
						/>
					</div>
					<div className="flex-1">
						<h2 className="text-3xl font-bold">Nuestra solución</h2>
						<p className="mt-4">
							Una plataforma que permite a inversores, independientemente del tamaño de su capital, el ser dueños de una propiedad y recibir retorno proporcional a su aporte
						</p>
					</div>
				</div>
				<div className='flex flex-row gap-10 w-screen items-center justify-center flex-wrap h'>
					<CardStack items={CardAboutUs} />
				</div>
				<section className="flex flex-col w-screen h-screen justify-center items-center">
					<h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
						Nuestra misión
					</h2>
					<p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
						Hacer de la inversión de bienes raíces algo seguro y accesible para todas las personas
					</p>
				</section>
				<section className="flex w-screen h-screen flex-col flex-wrap justify-center items-center">
					<div className="max-w-6xl mx-auto px-8 mt-8 flex flex-wrap flex-col items-center justify-center">
						<HoverEffect items={mercado} />
					</div>
				</section>
				<section className="flex w-full flex-col">
					<div className="flex w-full flex-col bg-gray-800">
						<Tabs aria-label="Options">
							<Tab key="photos" title="Photos">
								<Card>
									<CardBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
									</CardBody>
								</Card>
							</Tab>
							<Tab key="music" title="Music">
								<Card>
									<CardBody>
										Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
									</CardBody>
								</Card>
							</Tab>
							<Tab key="videos" title="Videos">
								<Card>
									<CardBody>
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</CardBody>
								</Card>
							</Tab>
						</Tabs>
					</div>
				</section>
			</div>
		</section>
	);
}
