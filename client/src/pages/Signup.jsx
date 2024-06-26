import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6';

const Signup = () => {
  const [formdata,setformdata] =useState({});
  const[error,setError]=useState(null);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();
  const [showpassword,setshowpassword] = useState(true);

  const handlechange=(e)=>{
      setformdata({
        ...formdata,
        [e.target.id]:e.target.value,
      });
  };

  const handleSubmit = async(e)=>{

      e.preventDefault();

      try{
        setloading(true);

        const res=  await fetch('/api/auth/signup',
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
            setError(data.message);
            setloading(false);
            return ;
          } 
          setloading(false);
          setError(null);
          navigate('/sign-in')
      }
     catch(error)
     {
      setloading(false);
      setError(error.message);
     }
       
    };
   


  console.log(formdata)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    
    <h1 className='text-3xl text-center font-semibold my-7 '>  Sign Up </h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
  <input type='text' placeholder='username' className='border p-3 rounded-lg' id="username" onChange={handlechange} />
  <input type="email" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handlechange} />
  <div className=' flex relative'>

<input type={showpassword ? ("type"):("password")} className='border p-3 rounded-lg w-full' placeholder='password' id="password" onChange={handlechange}/>

<button type ="button" onClick={()=>setshowpassword(!showpassword)}>
{
  showpassword ? (<FaRegEyeSlash className='absolute right-5 top-5'></FaRegEyeSlash>):(<FaEye className='absolute right-5 top-5'></FaEye>)
}
</button>
</div>

    <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> {loading ? ('Loading..') : ('Sign up')} </button>
   <OAuth></OAuth>
   </form>
  

  <div className='flex flex-row gap-2 mt-5'>
    <p>Have an account ?</p> 
    <Link to={'/sign-in'}>
      <span className='text-blue-700'> Sign in</span>
    </Link>
  </div>
  {error && <p className='text-red-400 mt-5'> {error} </p>}
    </div>
  )
}

export default Signup