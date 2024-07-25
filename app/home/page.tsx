import { FlipWords } from '@/components/ui/FlipWords';
import { beneficios } from '@/utils/beneficios';
import { HoverEffect } from '@/components/ui/CardHoverEffect';
import FaqPage from './faq/page';
import AboutUsPage from './about-us/page';
import Link from 'next/link';

const HomePage = () => {
    const words = ["seguro", "accesible", "rentable", "innovador"];
    return (
        <main className='bg-black overflow-x-hidden'>
            <div className="h-[50rem] flex justify-center items-center px-4">
                <div className="text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center leading-snug">
                    Innovamos en el mercado inmobiliario
                    <FlipWords words={words} /> <br />
                    con Dinsy
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8">
                <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 text-center'>
                    ¿Cuáles son los BENEFICIOS de invertir con nosotros?
                </h1>
                <HoverEffect items={beneficios} />
            </div>

            <div className="w-full mx-auto rounded-md h-[30rem] overflow-hidden">

                <div className="flex items-center flex-col justify-center px-2 md:px-10 w-full h-full">
                    
                
                    <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
                        ¿Listo para empezar hoy?
                    </h2>
                    <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                        Inicia tu camino hacia inversiones inmobiliarias seguras y rentables con Dinsy.
                        <br />
                        <span className='font-bold'>
                            ¡No necesitas un capital alto para empezar!
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                        <Link href={"/home/auth"} className="px-4 py-2 bg-[#2bb8c1] hover:bg-[#1c6163] transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                            Quiero Registrarme
                        </Link>
                    </div>
                </div>
            </div>
            <div className='' id='about'>
                <AboutUsPage/>
            </div>
            <div id='faq' className='flex items-end justify-end'>
                <FaqPage/>
            </div>
        </main>
    )
}

export default HomePage