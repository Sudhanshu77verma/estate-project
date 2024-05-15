import React, { useState } from 'react';

import {Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
 import { SignInFailure } from '../redux/user/userSlice';
 import { signInStart } from '../redux/user/userSlice';
 import { FaRegEyeSlash } from "react-icons/fa6";
 import { FaEye } from "react-icons/fa";
 import { signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';




const SignIn = () => {
  const [formdata,setformdata] =useState({});
  const {error,loading}=useSelector((state)=>state.user);
  const [showpassword,setshowpassword] = useState(true);
  const navigate=useNavigate();
  const dispatch =useDispatch();


  const handlechange=(e)=>{
      setformdata({
        ...formdata,
        [e.target.id]:e.target.value,
      });
  };

  const handleSubmit = async(e)=>{

      e.preventDefault();

      try{
        dispatch(signInStart());

        const res=  await fetch('/api/auth/signin',
      {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formdata),
       
    
        });
  
        const data= await res.json();
          if(data.success==false)
          {
            dispatch(SignInFailure(data.message))
            return ;
          } 
         dispatch(signInSuccess(data));
          navigate('/');
      }
     catch(error)
     {
      dispatch(SignInFailure(error.message))
    
     }
       
    };
   
    


  console.log(formdata)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    
    <h1 className='text-3xl text-center font-semibold my-7 '>  Sign In </h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
  <input type="email" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handlechange} />
  <div className=' flex relative'>

  <input type={showpassword ? ("type"):("password")} className='border p-3 rounded-lg w-full' placeholder='password' id="password" onChange={handlechange}/>
 
 <button type ="button" onClick={()=>setshowpassword(!showpassword)}>
 {
    showpassword ? (<FaRegEyeSlash className='absolute right-5 top-5'></FaRegEyeSlash>):(<FaEye className='absolute right-5 top-5'></FaEye>)
  }
 </button>
  </div>

    

    <button disabled={loading} className='  bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
       {loading ? ('Loading..') : ('Sign IN')} </button>

       <OAuth></OAuth>
   </form>


  <div className='flex flex-row gap-2 mt-5'>
    <p> Don't have an account ?</p> 
    <Link to={'/sign-up'}>
      <span className='text-blue-700'> Sign up</span>
    </Link>
  </div>
  {error && <p className='text-red-400 mt-5'> {error} </p>}
    </div>
  )
}

export default SignIn