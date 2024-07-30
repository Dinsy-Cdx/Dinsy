'use client';
import React from "react";
import PricingCard from "@/components/dashboard/suscripcion/PricingCard";
import { planes } from "@/utils/planes";
import Link from "next/link";
import { useAuth } from '@/app/context/AuthContext';
import { RiUserAddFill, RiUserFollowFill, RiUserStarFill, RiUserHeartFill, RiUserReceived2Fill, RiUserSettingsFill, RiUserSharedFill } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai'; // Icono de check

const SuscripcionPage = () => {
  const { user } = useAuth();

  // Dividir los planes en dos partes
  const firstFourPlans = planes.slice(0, 4);
  const remainingPlans = planes.slice(4);

  // Convertir el nivel a número para asegurar la comparación correcta
  const userLevel = Number(user?.level || 0);
  const userPlan = planes.find(plan => plan.id === userLevel);

  // Si no hay plan de usuario, mostrar el plan Free
  const currentPlan = userPlan ? userPlan : { title: "Free", price: "0", subtitle: "Membresía Vitalicia", description: "Acceso limitado debido a que no está afiliado a ningún plan de DINSY. Adquiera un plan ahora y comience a disfrutar de los beneficios!" };

  return (
    <div className="flex flex-col justify-between space-y-10 h-screen p-10">
        <div className="flex flex-col md:flex-row justify-between gap-6 border border-teal-500 rounded-2xl p-8 bg-gray-900 shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out relative">
        <div className="flex flex-col space-y-4 flex-1">
        <h2 className="text-3xl font-bold text-teal-300 text-center">
                        {`Plan Actual (${currentPlan.title})`}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base text-justify">
                        {currentPlan.description || "Descripción del plan no disponible"}
                    </p>
        </div>

        <div className="flex flex-col items-center gap-4 flex-1">
                    <h3 className="text-5xl md:text-7xl font-bold text-teal-400 text-center">
                        ${currentPlan.price}
                    </h3>
                    {!userPlan && (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-teal-300">
                                {currentPlan.subtitle}
                            </h2>
                            <p className="text-gray-200">
                                Aún no eres miembro de la comunidad de DINSY
                            </p>
                            <Link href="/dashboard/suscripcion">
                                <a className="text-blue-400 hover:underline transition-colors duration-300">
                                    Adquiere un plan Ahora!
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
                
      </div>
      <div className="w-full flex justify-center">
            <div className="w-full md:w-[800px] p-1  bg-black text-gray-100 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute  bg-gradient-to-r from-teal-900 via-blue-900 to-black opacity-40"></div>
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 relative z-10 text-teal-300">
                    Promociones Especiales
                </h2>
                <ul className="list-none space-y-2 text-sm md:text-base relative z-10">
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 7% por cada referido directo (primera generación).
                    </li>
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 4% por cada referido indirecto de segunda generación.
                    </li>
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 3% por cada referido indirecto de tercera generación.
                    </li>
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 2% por cada referido indirecto de cuarta generación.
                    </li>
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 1% por cada referido indirecto de quinta generación.
                    </li>
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 1% por cada referido indirecto de sexta generación.
                    </li>
                    <li className="flex items-center p-2">
                        <AiOutlineCheck className="text-teal-300 text-2xl mr-4" />
                        Se obtiene el 1% por cada referido indirecto de séptima generación.
                    </li>
                </ul>
            </div>
        </div>

      <div className="w-[100%] flex flex-wrap justify-center gap-4">
        {firstFourPlans.map((card) => {
          return <PricingCard key={card.id} planType={card} />;
        })}
      </div>

      <div
        className="w-[100%] py-6 flex flex-wrap justify-center gap-5"
        style={{ maxHeight: "calc(100vh - 70px)" }}
      >
        {remainingPlans.map((card) => {
          return <PricingCard key={card.id} planType={card} />;
        })}
      </div>
    </div>
  );
};

export default SuscripcionPage;
