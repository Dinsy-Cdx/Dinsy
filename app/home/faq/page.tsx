import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import Link from "next/link";

const FaqPage = () => {
  return (
    <div className='flex h-full bg-black py-16'>
      <div className='flex flex-col md:flex-row items-center justify-center w-full px-8'>
        <div className='md:w-1/3 py-30 md:pt-10 pb-2 px-4'>
          <h1 className='text-white text-4xl font-bold mb-4 text-center md:text-start  md:py-0'>¿TIENES PREGUNTAS?</h1>
          <p className='text-gray-400 text-lg mb-6'>
            Hemos elaborado una recopilación de preguntas frecuentes que pueden ser de interés para ti.
          </p>
          
        </div>
        <div className='md:w-2/3 p-4'>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Quién puede invertir?
              </AccordionTrigger>
              <AccordionContent>
                Cualquier persona mayor de edad con acceso a una billetera digital puede invertir en Dinsy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Quién se encarga de la tasación de las propiedades?
              </AccordionTrigger>
              <AccordionContent>
                La tasación de las propiedades es realizada por tasadores profesionales certificados, garantizando un valor justo y preciso.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                ¿La compra de las propiedades se realiza en base a deuda?
              </AccordionTrigger>
              <AccordionContent>
                No, Dinsy no utiliza deuda para la compra de propiedades. Todas las adquisiciones se realizan con el capital recaudado de los inversionistas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                ¿Qué es una billetera Metamask? ¿Para qué la necesito?
              </AccordionTrigger>
              <AccordionContent>
                Metamask es una billetera digital que permite a los usuarios almacenar y gestionar sus tokens de manera segura. Es necesaria para participar en la tokenización de propiedades en Dinsy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                ¿Qué sucede si una propiedad no se vende?
              </AccordionTrigger>
              <AccordionContent>
                Si una propiedad no se vende, Dinsy implementa estrategias de marketing adicionales y ajusta el precio para atraer más compradores potenciales.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                ¿Qué blockchain utiliza DINSI para tokenizar propiedades?
              </AccordionTrigger>
              <AccordionContent>
                Dinsy utiliza la blockchain de Ethereum para la tokenización de propiedades, asegurando transparencia y seguridad en todas las transacciones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                ¿Después de cuánto tiempo salen a la venta las propiedades?
              </AccordionTrigger>
              <AccordionContent>
                Las propiedades salen a la venta tan pronto como se completa el proceso de tokenización y se alcanza el financiamiento necesario.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>
                ¿Qué sucede si pierdo el acceso a mi billetera Metamask?
              </AccordionTrigger>
              <AccordionContent>
                Si pierdes el acceso a tu billetera Metamask, debes seguir el proceso de recuperación proporcionado por Metamask. Es crucial guardar tus frases de recuperación en un lugar seguro.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>
                ¿Tengo que verificar mi identidad para poder realizar una inversión?
              </AccordionTrigger>
              <AccordionContent>
                Sí, para cumplir con las regulaciones de KYC/AML, es necesario verificar tu identidad antes de realizar una inversión en Dinsy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>
                ¿Cómo se gestiona el mantenimiento de la propiedad?
              </AccordionTrigger>
              <AccordionContent>
                El mantenimiento de las propiedades es gestionado por empresas profesionales de administración inmobiliaria, garantizando que las propiedades se mantengan en óptimas condiciones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>
                ¿Como inversionista, puedo tener acceso a los documentos legales de la propiedad?
              </AccordionTrigger>
              <AccordionContent>
                Sí, todos los inversionistas tienen acceso a los documentos legales de la propiedad a través de la plataforma Dinsy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-12">
              <AccordionTrigger>
                ¿El precio de Ethereum afecta al precio de DINSI token?
              </AccordionTrigger>
              <AccordionContent>
                El precio del token Dinsy está vinculado al valor de las propiedades tokenizadas, no directamente al precio de Ethereum, aunque pueden existir influencias indirectas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FaqPage
