"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/Tabs";
import { PlanesInversionCard } from "../PlanesInversionCard";
import { planBasico, planJunior, planCorredor, planAsesor, planAdministrador, planGerente, planDirector } from "@/utils/PlanesInversion";

export function PlanesTab() {
  
  const planB = planBasico[0];
	const planJ = planJunior[0];
	const planC = planCorredor[0];
	const planAS = planAsesor[0];
	const planAD = planAdministrador[0];
	const planG = planGerente[0];
	const planD = planDirector[0];
  const tabs = [
    {
      title: "Básico",
      value: "basic",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black md:bg-gradient-to-r from-[#2bb9be] to-[#2e7b84]">
            <p className="hidden sm:flex">Plan Básico</p>
            <section className="flex flex-col flex-wrap md:flex-nowrap mb-10  md:items-center justify-center h-full w-full ">
              
                <PlanesInversionCard
                  key={planB.id}
                  tokens={planB.tokens}
                  tokensImage={planB.tokensImage}
                  builderPool={planB.builderPool}
                  roi={planB.roi}
                  discount={planB.discount}
                  plan={planB.plan}
                  id={0} />	
            </section>
           
        </div>
      ),
    },
    {
      title: "Junior",
      value: "junior",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black md:bg-gradient-to-r from-[#2bb9be] to-[#2e7b84]">
					<p className="hidden sm:flex">Junior</p>
          <section className="flex flex-col md:items-center flex-wrap md:flex-nowrap justify-center h-full w-full gap-12">
          
          <PlanesInversionCard
							key={planJ.id}
							tokens={planJ.tokens}
							tokensImage={planJ.tokensImage}
							builderPool={planJ.builderPool}
							roi={planJ.roi}
							discount={planJ.discount}
							plan={planJ.plan}
							id={0} />
            </section>
          
        </div>
      ),
    },
    {
      title: "Corredor",
      value: "corredor",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black md:bg-gradient-to-r from-[#2bb9be] to-[#2e7b84]">
          <p className="hidden sm:flex">Corredor Inmobiliario</p>
              <section className="flex flex-col md:items-center flex-wrap md:flex-nowrap justify-center h-full w-full gap-12">
              <PlanesInversionCard
                  key={planC.id}
                  tokens={planC.tokens}
                  tokensImage={planC.tokensImage}
                  builderPool={planC.builderPool}
                  roi={planC.roi}
                  discount={planC.discount}
                  plan={planC.plan}
                  id={0} />
            </section>
        </div>
      ),
    },
    {
      title: "Asesor",
      value: "AsesorInmobiliario",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black md:bg-gradient-to-r from-[#2bb9be] to-[#2e7b84]">
          <p className="hidden sm:flex">Asesor Inmobiliario</p>
          <section className="flex flex-col  md:items-center flex-wrap md:flex-nowrap justify-center h-full w-full gap-12">
					<PlanesInversionCard
							key={planAS.id}
							tokens={planAS.tokens}
							tokensImage={planAS.tokensImage}
							builderPool={planAS.builderPool}
							roi={planAS.roi}
							discount={planAS.discount}
							plan={planAS.plan}
							id={0} />
				</section>
        </div>
      ),
    },
    {
      title: "Administrador",
      value: "administrador",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black md:bg-gradient-to-r from-[#2bb9be] to-[#2e7b84]">
          <p className="hidden sm:flex">Administrador Inmobiliario</p>
          <section className="flex flex-col  md:items-center flex-wrap md:flex-nowrap justify-center h-full w-full gap-12">
          <PlanesInversionCard
            key={planAD.id}
            tokens={planAD.tokens}
            tokensImage={planAD.tokensImage}
            builderPool={planAD.builderPool}
            roi={planAD.roi}
            discount={planAD.discount}
            plan={planAD.plan}
            id={0} />
          </section>
        </div>
      ),
    },
    {
      title: "Gerente",
      value: "gerente",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  bg-black md:bg-gradient-to-r   md:from-[#2bb9be] md:to-[#2e7b84]">
          <p className="hidden sm:flex">Gerente Inmobiliario</p>
          <section className="flex flex-col md:items-center  flex-wrap md:flex-nowrap justify-center h-full w-full gap-12">
          <PlanesInversionCard
            key={planG.id}
            tokens={planG.tokens}
            tokensImage={planG.tokensImage}
            builderPool={planG.builderPool}
            roi={planG.roi}
            discount={planG.discount}
            plan={planG.plan}
            id={0} />
          </section>
        </div>
      ),
    },
    {
      title: "Director",
      value: "director",
      content: (
        <div className="w-full overflow-hidden relative h-96 sm:h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black md:bg-gradient-to-r from-[#2bb9be] to-[#2e7b84]">
          <p className="hidden sm:flex">Director Inmobiliario</p>
          <section className="flex flex-col md:items-center flex-wrap md:flex-nowrap justify-center h-full w-full gap-12">
            <PlanesInversionCard
              key={planD.id}
              tokens={planD.tokens}
              tokensImage={planD.tokensImage}
              builderPool={planD.builderPool}
              roi={planD.roi}
              discount={planD.discount}
              plan={planD.plan}
              id={0} />
            </section>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}


