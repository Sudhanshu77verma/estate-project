

import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import ListingItem from "../components/ListingItem";
function Search() {

  const navigate=useNavigate();
  const location =useLocation()
  console.log(location)
  const [loading,setloading]=useState(false);
  const [listing,setListing]=useState([ ]);
  const [showMore,setShowMore]=useState(false)
 console.log(listing);

  const [sideBardata,setsidebardata]=useState({
    searchTerm:'',
    type:'all',
    parking:false,
    furnished:false,
    offer:false,
    sort:'created_at',
    order:'desc',


  })
console.log(sideBardata)


  useEffect(()=>{
    const UrlParams=new URLSearchParams(location.search);
    const SearchTermFromUrl= UrlParams.get('searchTerm');
    const TypeFromUrl=UrlParams.get('type');
    const parkingfromUrl=UrlParams.get('parking');
    const furnishedformurl=UrlParams.get('furnished');
    const offerfromurl=UrlParams.get('offer');
    const sortFromUrl=UrlParams.get('sort');
    const orderfromUrl=UrlParams.get('order');
  
    // if anyone of them will be changes on url 
    if(SearchTermFromUrl ||
      TypeFromUrl ||
      parkingfromUrl || 
      furnishedformurl || 
      offerfromurl ||
      sortFromUrl || 
      orderfromUrl 
      )
      {
  setsidebardata({
    searchTerm : SearchTermFromUrl || '' ,
    type :TypeFromUrl || 'all',
    parking : parkingfromUrl ==='true' ? true : false,
    furnished:furnishedformurl ==='true' ? true : false,
    offer:offerfromurl ==='true' ? true :false ,
    sort : sortFromUrl || 'created_at',
    order:orderfromUrl || 'desc',
  })
     

   }


      const fetchListing = async()=>{
        setloading(true);
        const searchQuery=UrlParams.toString();
      const res= await fetch(`/api/listing/get?${searchQuery}`);
         const data= await res.json();
         if(data.length >8 )
         {
          setShowMore(true);
         }
        setListing(data);
        setloading(false);
        
      }
      // console.log(sideBardata)
      fetchListing();
  } ,[location.search])


const onshowMoreHandleclick = async()=>{
  const numberoflistings=listing.length;
  const startIndex=numberoflistings;
  const urlParams=new URLSearchParams(location.search);
  urlParams.set('startIndex',startIndex);
  const SearchQuery=urlParams.toString();
  const res=await fetch(`/api/listing/get?${SearchQuery}`);
  const data= await res.json();
  if(data.length< 9)
  {
   setShowMore(false);
  }
  setListing([...listing,...data]);

}


  // console.log(sideBardata)
  const handleChange=(e)=>{
    if(e.target.id === 'all' || e.target.id ==='rent' || e.target.id ==='sale')
    {
      setsidebardata({...sideBardata,type:e.target.id})
    }
    if(e.target.id ==='searchTerm')
    {
      setsidebardata({...sideBardata,searchTerm:e.target.value})
    }
    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'  )
    {
      setsidebardata({...sideBardata,[e.target.id] : e.target.checked || e.target.checked ==='true' ? true : false})
    }

   if( e.target.id === 'sort_order' ){
    const sort =e.target.value.split('_')[0] || 'created_at';
    const order =e.target.value.split('_')[1] || 'desc';
    setsidebardata({...sideBardata,sort,order});
   }

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const UrlParams= new URLSearchParams();
    UrlParams.set('searchTerm',sideBardata.searchTerm);
    UrlParams.set('type',sideBardata.type);
    UrlParams.set('parking',sideBardata.parking);
    UrlParams.set('furnished',sideBardata.furnished);
    UrlParams.set('offer',sideBardata.offer);
    UrlParams.set('sort',sideBardata.sort);
    UrlParams.set('order',sideBardata.order);
    const SearchQuery= UrlParams.toString();
    navigate(`/search?${SearchQuery}`);
   
  }


  return (
    <div className="flex flex-col md:flex-row  gap-3">
      <div className="  p-7 border-b-2  md:border-r-2 md:min-h-screen ">
        <form onSubmit={handleSubmit}  className=" flex flex-col gap-5">
          <div className="p-7 boder-b-2 sm:border-r-2 flex items-center">
            <label className=" font-semibold whitespace-nowrap mr-1"> Search Term : </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="searchTerm..."
              className="rounded-lg p-3 w-full"
              value={sideBardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold"> Type:</label>
            <div className="flex gap-2">
              <input checked={sideBardata.type ==='all'}
              onChange={handleChange} className="w-5" type="checkbox" id="all" />
              <span>Rent & sale</span>
            </div>

            <div className="flex gap-2">
              <input onChange={ handleChange} checked={sideBardata.type==='rent'} className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input  onChange={ handleChange} checked={sideBardata.type==='sale'} className="w-5" type="checkbox" id="sale" />
              <span> Sale</span>
            </div>

            <div className="flex gap-2">
              <input onChange={ handleChange} checked={sideBardata.offer} className="w-5" type="checkbox" id="offer" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold"> Amenities:</label>
            <div className="flex gap-2">
              <input onChange={handleChange} checked={ sideBardata.parking} className="w-5" type="checkbox" id="parking" />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input  onChange={handleChange} checked={ sideBardata.furnished} className="w-5" type="checkbox" id="furnished" />
              <span>furnished</span>
            </div>

      
          </div>

          <div  className="flex items-center gap-3">
            <label className="font-semibold" > Sort :  </label>

            <select onChange={handleChange}
             defaultValue={'created_at_desc'} className="border rounded-md p-1"  id="sort_order">
                <option value={'regularPrice_desc'} className="bg-slate-700 text-white">Price High To Low</option>
                <option value={'regularPrice_asc'} className="bg-slate-700 text-white">Price Low To High</option>
                <option value={'createdAt-desc'} className="bg-slate-700 text-white" >Oldest</option>
                <option  value={'createdAt-asc'}  className="bg-slate-700 text-white"> Latest </option>
            </select>
          </div>

          <button className="bg-slate-700 uppercase text-white rounded-lg p-3"> Search</button>
        </form>
      </div>
 
      <div>
        <h1 className=" mt-3 text-3xl font-semibold border-b text-slate-600 p-2 text-center flex ">Listing results : </h1>

       <div className="p-7 sm:flex flex-wrap gap-8 ">
        {
           !loading && listing.length===0 && (
            <p className="text-xl text-slate-700">No Listing Found !</p>
           )
        }
        {
          loading && (
            <p className="text-xl text-center w-full text-slate-600 ">Loading...</p>
          )
        }
        {
          !loading && listing && listing.map((list)=>(
            <ListingItem  listing={list} key={list._id}></ListingItem>
          ))
        }

{
          showMore && (
            <button className="text-green-600 text-center hover:underline" onClick={
              onshowMoreHandleclick}
            >
              Show More
            </button>
          )
        }
       </div>
      
      </div>
    </div>
  );
}

export default Search;
