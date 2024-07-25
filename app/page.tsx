import React from "react";
import HomeLayout from "./home/layout";

export default function Home() {
	return (
		<main className='bg-black'>
			<HomeLayout>
				{/* Puedes añadir contenido adicional aquí */}
				<>
					{/* Contenido vacío como children */}
				</>
			</HomeLayout>
		</main>
	);
}
