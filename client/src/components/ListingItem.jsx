import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
const ListingItem = ({listing}) => {

  const [desc,setdesc]= useState(listing.description)
  

  console.log(desc)
  return (
    <div className='bg-white flex flex-col shadow-md hover:lg transition-300 overflow-hidden w-full sm:w-[300px]  ' >
         <Link to={`/listing/${listing._id}`} >
           
         <img src={listing.imageUrls[0]} className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' alt="" />
     
        <div className='p-3 flex flex-col gap-2 '>
     <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>

     <div className='flex flex-row items-center gap-2 '>
        <MdLocationOn className='text-green-700'></MdLocationOn>
        <p className='text-sm font-semibold text-slate-600'>{listing.address}</p>
     </div>

     
     <p className="text-sm text-gray-600  flex items-center">
  {
    desc.length > 100 ? ( desc.substring(0,81) + "..."):(desc)
  }
     </p>
     <p className='text-lg text-gray-500 mt-2 font-semibold '> $
     {
      listing.offer ? listing.discountPrice.toLocaleString('en-Us') : listing.regularPrice.toLocaleString('en-Us')
      
     } 
     {listing.type === 'rent' && ' /month'}
     </p>
      

      <div className='text-slate-600 flex items-center gap-3'>
         <div className='flex flex-row items-center text-xs font-bold'>
          {listing.bedrooms> 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed`}
         </div>

         <div className='flex flex-row items-center text-xs font-bold'>
          {listing.bedrooms> 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath`}
         </div>
      </div>
        </div>


        
         </Link>

    </div>
  )
}

export default ListingItem