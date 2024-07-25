import { Input } from '@/components/ui/input'
import { Label, LabelInputContainer } from '@/components/ui/label'
import { comodidades } from '@/utils/comodidades';
import React from 'react'

const AddPropertiePage = () => {

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-800 overflow-auto">
      <form className="my-8 flex flex-col">
        <div className="flex flex-col space-y-1 md:space-y-0 md:space-x-2 mb-4 gap-8 ">
          <h2 className='text-3xl font-semibold'>Vista</h2>
          <LabelInputContainer>
            <Label htmlFor="propertyTitle">Titulo Propiedad</Label>
            <Input id="propertyTitle" placeholder="Nombre de la propiedad" type="text" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="description">Descripcion</Label>
            <Input id="description" placeholder="Escribe acerca de tu propiedad" type="text" />
          </LabelInputContainer>

          <div className="flex flex-row gap-10 justify-around">

            <div className="flex flex-col gap-2 w-[50%]">
              <label htmlFor="category">Categoría</label>
              <select name="categorySelection" id="categorySelection" className="border border-gray-300 rounded-md px-2 py-1">
                <option value="houses">Casas</option>
                <option value="apartments">Departamentos</option>
                <option value="condos">Condominios</option>
              </select>
            </div>

            <div className='flex flex-col gap-2 w-[50%]'>
              <label htmlFor="category">Categoría</label>
              <select name="categorySelection" id="categorySelection" className="border border-gray-300 rounded-md px-2 py-1">
                <option value="houses">Casas</option>
                <option value="apartments">Departamentos</option>
                <option value="condos">Condominios</option>
              </select>
            </div>

          </div>


        </div>

        <LabelInputContainer className='py-4'>
          <Label htmlFor="price">Precio</Label>
          <Input id="price" placeholder="Precio de la propiedad" type="text" />
        </LabelInputContainer>

        <div className='flex flex-col py-10'>
          <h2 className='text-3xl font-semibold'>Listing Details</h2>


          <div className='flex flex-row gap-10 py-6'>
            <LabelInputContainer >
              <Label htmlFor="area">Area</Label>
              <Input id="area" placeholder="200m" type="text" />
            </LabelInputContainer>

            <div className='flex flex-col gap-1 w-full space-y-2'>
              <label htmlFor="bedrooms" className='text-sm font-medium text-black dark:text-white leading-none'>Habitaciones</label>
              <select name="bedrooms" id="bedrooms" className="border border-gray-300 rounded-md px-2 py-1.5">
                <option value="0">0</option>
                <option value="1">1</option >
                <option value="2">2</option>
              </select>
            </div>

          </div>


          <div className='flex flex-row gap-10 py-5'>
            <div className='flex flex-col gap-2 w-[50%] space-y-2'>
              <label htmlFor="bathrooms" className='text-sm font-medium text-black dark:text-white leading-none'>Baños</label>
              <select name="bathrooms" id="bathrooms" className="border border-gray-300 rounded-md px-2 py-1.5">
                <option value="0">0</option>
                <option value="1">1</option >
                <option value="2">2</option>
              </select>
            </div>

            <div className='flex flex-col gap-2 w-[50%] space-y-2'>
              <label htmlFor="kitchens" className='text-sm font-medium text-black dark:text-white leading-none'>Cocinas</label>
              <select name="kitchens" id="kitchens" className="border border-gray-300 rounded-md px-2 py-1.5">
                <option value="0">0</option>
                <option value="1">1</option >
                <option value="2">2</option>
              </select>
            </div>
          </div>

          <div className='flex flex-row gap-10 py-5'>
            <div className='flex flex-col gap-1 w-full space-y-2'>
              <label htmlFor="garages" className='text-sm font-medium text-black dark:text-white leading-none'>Garajes</label>
              <select name="garages" id="garages" className="border border-gray-300 rounded-md px-2 py-1.5">
                <option value="0">0</option>
                <option value="1">1</option >
                <option value="2">2</option>
              </select>
            </div>
            <LabelInputContainer>
              <Label htmlFor="garageArea">Area del Garaje</Label>
              <Input id="garageArea" placeholder="20m" type="text" />
            </LabelInputContainer>

          </div>



          <div className='flex flex-row gap-10 py-5'>
            <LabelInputContainer>
              <Label htmlFor="yearBuilt">Año de construcción</Label>
              <Input id="yearBuilt" placeholder="Escribe el año" type="text" />
            </LabelInputContainer>

            <div className='flex flex-col gap-1 w-full space-y-2'>
              <label htmlFor="flours" className='text-sm font-medium text-black dark:text-white leading-none'>Pisos</label>
              <select name="flours" id="flours" className="border border-gray-300 rounded-md px-2 py-1.5">
                <option value="0">0</option>
                <option value="1">1</option >
                <option value="2">2</option>
              </select>
            </div>

          </div>

          <LabelInputContainer className='py-5'>
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" placeholder="Escribe acerca de la propiedad..." type="text" />
          </LabelInputContainer>
        </div>



        <div>
          <h2 className='text-3xl font-semibold'>Adjunto de Foto y Video</h2>

          <div className='flex flex-col py-5'>
            <span>Archivo adjunto*</span>
            <div className="flex flex-row justify-between bg-black items-center px-10 rounded-xl py-4 mt-2">
              <span>FotoPropiedad01.jpg</span>
              <button>x</button>
            </div>
            <div className="flex flex-row justify-between bg-black items-center px-10 rounded-xl py-4 mt-2">
              <span>FotoPropiedad01.jpg</span>
              <button>x</button>
            </div>
          </div>

          <div className='flex flex-row flex-start gap-5 items-center'>
            <button className='bg-black text-white p-3 rounded-xl'>Subir archivo</button>
            <span >Subir archivo.png,.jpg,.mp4</span>
          </div>
        </div>





        <div>
          <h2 className='text-3xl font-semibold py-10'>Seleccionar Comodidades</h2>
          <div className='flex flex-row flex-wrap gap-5 justify-center'>
            {comodidades.map((item) => {
              return (
                <div className='w-[30%] items-center' key={item.id}>
                  <input className='mx-1' type="checkbox" id={item.item.toLowerCase().replace(/\s/g, "-")} name={item.item.toLowerCase().replace(/\s/g, "-")} />
                  <label htmlFor={item.item.toLowerCase().replace(/\s/g, "-")}>{item.item}</label>
                </div>
              )
            })}
          </div>
        </div>



        <div className='flex flex-col gap-4 py-10'>
          <h2 className='text-3xl font-semibold'>Dirección y ubicación</h2>
          <LabelInputContainer>
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" placeholder="Jr. lorem 299" type="text" />
          </LabelInputContainer>


          <div className='flex flex-row flex-wrap justify-around  w-full  z-50'>

            <LabelInputContainer className='flex w-auto'>
              <Label htmlFor="zip-code">País</Label>
              <Input id="zip-code" placeholder="12043" type="text" />
            </LabelInputContainer>

            <LabelInputContainer className='flex w-auto'>
              <Label htmlFor="zip-code">Ciudad</Label>
              <Input id="zip-code" placeholder="12043" type="text" />
            </LabelInputContainer>

            <LabelInputContainer className='flex w-auto'>
              <Label htmlFor="zip-code">Código Postal</Label>
              <Input id="zip-code" placeholder="12043" type="text" />
            </LabelInputContainer>

            <LabelInputContainer className='flex w-auto'>
              <Label htmlFor="zip-code">Distrito</Label>
              <Input id="zip-code" placeholder="12043" type="text" />
            </LabelInputContainer>


          </div>

          <LabelInputContainer>
            <Label htmlFor="map-location">Ubicación</Label>
            <Input id="map-location" placeholder="XC32+WD1, Moiran, N105" type="text" />
          </LabelInputContainer>
          <div className="relative w-full h-96">
            <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus" aria-hidden="false">
            </iframe>
          </div>
        </div>

      </form>
    </div>
  );
}

export default AddPropertiePage

