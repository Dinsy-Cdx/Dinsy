'use client';

import React, { useEffect, useState } from 'react';
import { Label, LabelInputContainer } from "../../../components/ui/label";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { Input } from "../../../components/ui/input";
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';

const PerfilPage = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Changing photo");
  };

  const { user } = useAuth();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    setWalletAddress(address);
  }, []);

  return (
    <div className='flex justify-center h-full  overflow-y-auto'>
      <div className=" w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-800 overflow-y-auto" >
        <form className="my-8" onSubmit={handleSubmit}>

          <div className=" text-xl text-neutral-800 dark:text-neutral-200 flex justify-start gap-4 md-gap-8">
            <div className=' w-[120px] md:w[100px] '>
            <Image
              src={"/images/logo.png"}
              alt={"foto de perfil"}
              width={150}
              height={150}
              style={{ width: 'auto', height: 'auto' }}
            />
            </div>
            <button className=' text-sm md:text-xl '>
              Subir nueva foto
              <BottomGradient />
            </button>
            <button className=' text-sm md:text-xl '>
              Eliminar
            </button>
          </div>
          <div className=" flex flex-col  py-3   ">
            <LabelInputContainer>
              <Label htmlFor="user">Usuario*</Label>
              <Input id="user" placeholder="Mafer" type="text" value={user?.username || ''} readOnly />
            </LabelInputContainer>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 py-3 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Nombres</Label>
                <Input id="firstname" placeholder="Maria" type="text" value={user?.firstName || ''} readOnly />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Apellidos</Label>
                <Input id="lastname" placeholder="Moreno" type="text" value={user?.lastName || ''} readOnly />
              </LabelInputContainer>
            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" placeholder="micorreo@gmail.com" type="text" value={user?.email || ''} readOnly />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="Position">Puesto</Label>
                <Input id="Position" placeholder="Agent" type="text" value={user?.position || ''} readOnly />
              </LabelInputContainer>
            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 gap-5 py-10 flex-wrap mb-4">
              <LabelInputContainer>
                <Label htmlFor="phone-number">Número Telefónico</Label>
                <Input id="phone-number" placeholder="+51 987 654 321" type="text" value={user?.phoneNumber || ''} readOnly />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="website">Sitio Web</Label>
                <Input id="website" placeholder="https://laweb.com" type="text" value={user?.website || ''} readOnly />
              </LabelInputContainer>
              <div className='w-[100%]'>
                <LabelInputContainer>
                  <Label htmlFor="about">Acerca de</Label>
                  <Input id="about" className='w-full' placeholder="Yo estoy trabajando por los últimos 3 años como..." type="text" value={user?.about || ''} readOnly />
                </LabelInputContainer>
              </div>
            </div>
            <div className='flex flex-col py-8 gap-5'>
              <h2>Redes De Contacto</h2>
              <LabelInputContainer>
                <Label htmlFor="network">Red social 1</Label>
                <Input id="network" placeholder="https://www.facebook.com/qweasdzxc" type="text" value={user?.social1 || ''} readOnly />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="network">Red social 2</Label>
                <Input id="network" placeholder="https://www.twitter.com/qweasdzxc" type="text" value={user?.social2 || ''} readOnly />
              </LabelInputContainer>
            </div>

            <div className='flex flex-col gap-4 py-10'>
              <h2>Dirección y ubicación</h2>
              <LabelInputContainer>
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Jr. lorem 299" type="text" value={user?.address || ''} readOnly />
              </LabelInputContainer>

              <div className='flex flex-row flex-wrap justify-around  w-full  z-20'>
                <LabelInputContainer className='flex w-auto'>
                  <Label htmlFor="country">País</Label>
                  <Input id="country" placeholder="Perú" type="text" value={user?.country || ''} readOnly />
                </LabelInputContainer>

                <LabelInputContainer className='flex w-auto '>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" placeholder="Lima" type="text" value={user?.city || ''} readOnly />
                </LabelInputContainer>

                <LabelInputContainer className='flex w-auto'>
                  <Label htmlFor="zip-code">Código Postal</Label>
                  <Input id="zip-code" placeholder="12043" type="text" value={user?.zipCode || ''} readOnly />
                </LabelInputContainer>

                <LabelInputContainer className='flex w-auto'>
                  <Label htmlFor="district">Distrito</Label>
                  <Input id="district" placeholder="Miraflores" type="text" value={user?.district || ''} readOnly />
                </LabelInputContainer>
              </div>
              <LabelInputContainer>
                <Label htmlFor="map-location">Ubicación</Label>
                <Input id="map-location" placeholder="XC32+WD1, Moiran, N105" type="text" value={user?.location || ''} readOnly />
              </LabelInputContainer>
              <div className="relative w-full h-96">
                <iframe className="absolute top-0 left-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus"
                  aria-hidden="false" >
                </iframe>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilPage;
