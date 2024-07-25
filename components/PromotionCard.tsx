"use client";
import React from "react";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { RiBuilding4Fill } from "react-icons/ri";

export function PromotionCard() {
  return (
    <div className="flex flex-col gap-10 py-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center">Promociones</h2>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        <BackgroundGradient className="rounded-[22px] w-full max-w-xs md:max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 mx-auto flex justify-center items-center">
          <div className="flex flex-col items-center justify-center w-full h-[450px] p-6 bg-zinc-900 rounded-xl">
            <RiBuilding4Fill size={250} className="text-6xl  mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Mini Departamento</h3>
            <p className="text-lg mb-4">$80,000,000</p>
          </div>
        </BackgroundGradient>
        <BackgroundGradient className="rounded-[22px] w-full max-w-xs md:max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 mx-auto flex justify-center items-center">
          <div className="flex flex-col items-center justify-center w-full h-[450px] p-6 bg-white dark:bg-zinc-900 rounded-xl">
            <Image
              src="/images/iphone.png"
              alt="imagen iphone 15 pro"
              width={250}
              height={200}
              className="mb-4"
            />
            <h3 className="text-xl md:text-2xl font-semibold mb-2">2 iPhones 15 Pro</h3>
            <p className="text-lg mb-4">$10,000,000</p>
          </div>
        </BackgroundGradient>
      </div>
      <p className="text-center text-lg mt-6 py-4">
        Fechas límites para el iPhone hasta el 10 de junio y para el mini Depa
        hasta el 25 de junio
      </p>
    </div>
  );
}
