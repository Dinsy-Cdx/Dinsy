import React from 'react'
import Favorites from '@/components/dashboard/favorites/favorites'


const FavoritePage = () => {
    return (
        <div className='flex w-full justify-center flex-row flex-wrap gap-6 p-7 h-screen overflow-hidden'>
            <Favorites />
            <Favorites />
            <Favorites />
            <Favorites />
            <Favorites />
            <Favorites />
            <Favorites />
        </div>
    )
}

export default FavoritePage