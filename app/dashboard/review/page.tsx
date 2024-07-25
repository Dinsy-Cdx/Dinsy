import React from 'react'
import Review from '@/components/dashboard/review/Review'

const ReviewPage = () => {
    return (
        <div className='flex flex-col items-center h-full overflow-auto'>
            <div className='flex flex-row justify-between w-full px-10 '>
                <span className='flex self-start'>Mostrando 1-5 de 40 resultados</span>

                <span className='flex flex-row self-end'>
                    Ordenar por:
                    <select name="" id="">
                        <option value="Más nuevo"></option>
                        <option value="Mejor calificado"></option>
                        <option value="Calificación alta"></option>
                        <option value="Calificación baja"></option>
                    </select>
                </span>

            </div>
            {/* mapping missing  */}
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
        </div>
    )
}

export default ReviewPage