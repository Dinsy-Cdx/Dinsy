'use client';
import Card from '@/components/Card';
import DetailView from '@/components/DetailView';
import React, { useState } from 'react';
import { inmuebles } from '@/utils/inmuebles';
import CardPerfil from '@/components/dashboard/CardPerfil';

const DashboardPage = () => {
    const [selectedInmueble, setSelectedInmueble] = useState<null | typeof inmuebles[0]>(null);

    const handleCloseDetail = () => {
        setSelectedInmueble(null);
    };

    return (
        <div className="flex flex-col items-start text-black w-full pt-10 pb-20">
            <CardPerfil />

            <div className="w-full flex flex-wrap h-full">
                <div className={`w-full  ${selectedInmueble ? 'lg:w-[0%]' : 'lg:w-full'} flex flex-wrap justify-center gap-8 overflow-auto h-full`}>
                    {
                        inmuebles.map((inmueble) => {
                            return <Card key={inmueble.id} inmueble={inmueble} onDetailClick={() => setSelectedInmueble(inmueble)} />
                        })
                    }
                </div>
                {selectedInmueble && (
                    <div className='w-full lg:w-[40%] p-6 overflow-auto h-full'>
                        <DetailView inmueble={selectedInmueble} onClose={handleCloseDetail} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
