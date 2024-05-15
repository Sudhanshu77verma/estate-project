import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from  'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure,deleteUserSuccess,deleteUserStart, signoutUserStart, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice.js'
import  { updateUserStart,updateUserFailure,updateUserSuccess} from '../redux/user/userSlice.js'

const Profile = () => {
  const {currentUser,loading,error} =useSelector((state)=> state.user)
  const fileRef=useRef(null);
  const [file,setfile] =useState(undefined);
  const [fileError,setfileerror]= useState(false)
  const [filePercent,setFilepercent] =useState(0);
  const[formdata,setformdata]=useState({});
  const [updatesuccess,setupdatesuccess]=useState(false);
  const [showListinError,setshowListingerror]=useState(false);
  const [userListing,setUserlisting]=useState([]);

  const dispatch=useDispatch();
  console.log(formdata); 
  console.log(filePercent);
  console.log(file);
  
  const handleShowlisting = async()=>{
    try{ 
      setshowListingerror(false);
    const res=await fetch(`/api/user/listing/${currentUser._id}`);
    const data =await res.json();
    if(data.success===false)
    {
      setshowListingerror(true);
      return ;
    } 

    setUserlisting(data);
    setshowListingerror(false);
    
    }catch(error){
   setshowListingerror(true);
    }
  }
  const handleSignout=async()=>{
    try{ 
      dispatch(signoutUserStart())
      const res=await fetch('/api/auth/signout');
      const data=res.json();
      if(data.success===false)
      {
          dispatch(signoutUserFailure(data.message));
          return ;
      } 
      dispatch(signoutUserSuccess(data))

    }catch(error)
    {
        dispatch(signoutUserFailure(error))
    }
  }
    const handleDelete= async()=>{
    try{  
       dispatch(deleteUserStart());
        const res= await fetch(`/api/user/delete/${currentUser._id} `,{
          method:'DELETE',
        });
        
        const data= await res.json();
        if(data.success==false)
        {
          dispatch(deleteUserFailure(data.message));
          return;
        }
      dispatch(deleteUserSuccess(data));
      

    }catch(error){
        dispatch(deleteUserFailure(error.message))
    }
    }
     
  useEffect(()=>{
    if(file)
    {
      handleFileUpload(file)

    }  
  },[file]
  )
  const handleFileUpload =(file)=>{
    
    const storage =getStorage(app);
    const fileName=new Date().getTime()+file.name;

    const storageRef=ref  (storage,fileName);
    const UploadTask = uploadBytesResumable(storageRef,file);
      
     UploadTask.on('state_changed',(snapshot)=>{

      const progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
      // console.log("upload is" + progress + "%done")
      setFilepercent(Math.round(progress))
     },

     (error)=>{
      setfileerror(true);
     },

     ()=>{
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>
      (  setformdata({...formdata,avatar:downloadURL}))

      )
     }
     )
  } 
  const handleDeleteListing =async(ListingId)=>{
    try{ 
      const res= await fetch(`/api/listing/delete/${ListingId}`, {
        method:'Delete'
      });
      const data=await res.json();
      if(data.success=== false)
      {
        console.log(data.message);
        return ;
      }
       
      setUserlisting((prev) =>{
        prev.filter((listing)=>listing._id !== ListingId)
      })
    }catch(error)
    {
      
    }
  }

  const handlechange=(e)=>{
  setformdata({...formdata,[e.target.id] : e.target.value})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formdata),

      } )

      const data= await res.json();
      if(data.success==false )
      {
        dispatch(updateUserFailure(data.message));
        return ;
      } 
      dispatch(updateUserSuccess(data));
  setupdatesuccess(true);

    }
    catch(error)
    {
      dispatch(updateUserFailure(error.message));
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto ' >
      
     <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1> 

     <form onSubmit={handleSubmit} className='flex flex-col '>

      <input onChange={(e)=> setfile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'></input>
     
     <img   onClick={()=>fileRef.current.click()} className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"src={formdata.avatar ||  currentUser.avatar} alt="" />
      
        <p> 
      {
        fileError ? 
        (<span className='text-red-700 text-center'  > Error Image Upload </span>)
        :
        filePercent > 0 && filePercent< 100   ?  
( <span> {`uploading ${filePercent} % `}</span>) :
filePercent===100 ? (
  <span className='text-green-700'> Image Uploaded Successfully</span>
)
:
('')

}  

        
        </p>
    <input className=' border border-slate-400 mt-5 h-10 rounded-lg p-3' onChange={handlechange}  type='text'defaultValue={currentUser.username} placeholder='username' id='username' ></input>
    <input className=' border border-slate-400 mt-5 h-10 rounded-lg p-3' onChange={handlechange}  type="email" defaultValue={currentUser.email} placeholder ="email"id="email"  />
     <input type="password" placeholder='password' id='password ' onChange={handlechange}  className=' border border-slate-400 mt-5 h-10 rounded-lg p-3' />
    
   

    <button disabled={loading} className='bg-slate-700 text-white rounded-lg  mt-5 p-3 uppercase hover:opacity-95 disabled:opacity-80'> {loading ? 'Loading...' : 'Update'} </button>  
    <Link className='bg-green-700 text-white text-center rounded-lg  mt-5 p-3 uppercase hover:opacity-95 disabled:opacity-80' to={"/create-listing"}> Create Listing</Link>
    
     </form>
       
       <div className='flex flex-row justify-between mt-4 text-red-700 cursor-pointer'>
         <span onClick={handleDelete}> Delete Account</span> 

         <span onClick={handleSignout}> Sign Out</span>
       </div>
      

      <p className='text-red-700 mt-5'> {error? error:' '}</p>
      <p className='text-green-700 mt-5'> {updatesuccess ?  ' User is updated successfully': ''}</p>
      <button type="button" onClick={handleShowlisting} className='text-green-700 w-full'>Show Listings </button>
     
       <p className='text-red-700 mt-5'>
         {
        showListinError ?  "error in show listing " : ""
       } 
       </p> 

     {userListing && userListing.length > 0 && 

      <div className='flex flex-col gap-4 '>
        <p className='font-semibold text-2xl text-center mt-2'>Your Listings </p>
        {
         userListing.map((listing)=>(
        <div className='flex flex-row justify-between items-center border border-dashed mt-5' key={listing._id}>
        <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls} className='h-16 w-16 object-contain rounded-sm' alt="" /></Link>
        
        <Link to={`/listing/${listing._id}`}>
          <p className='text-slate-700 font-semibold truncate'>  {listing.name}</p>

        </Link>

        <div className='flex flex-col justify-center items-center'>
          <button onClick={()=>handleDeleteListing(listing._id)}  className='text-red-700 uppercase'> Delete</button>
         
         
          <Link to={`/update-listing/${listing._id}`}> 
          <button className='text-green-700 uppercase'> Edit</button>
          </Link>


        </div>
       
       
        </div>

       ))} 
      </div>

         }
  
       </div>
  )
}

export default Profile