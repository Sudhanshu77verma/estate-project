import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Header = () => {
 

 
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setsearchTerm] = useState('');
  const navigate=useNavigate();

 
 const handleSubmit =(e)=>{
  e.preventDefault();

  const urlParams=new URLSearchParams(window.location.search);
  urlParams.set('searchTerm',searchTerm);
  const SearchQuery=urlParams.toString();
  navigate(`/search?${SearchQuery}`);
 };


 useEffect(()=>{
  const UrlParams=new URLSearchParams(location.search);
   const searchTermsFromUrl= UrlParams.get('searchTerm');
   console.log(searchTermsFromUrl)
   if(searchTermsFromUrl)
   {
    setsearchTerm(searchTermsFromUrl);
   }


   console.log(searchTerm)
 },[window.location.search]);

  return (
    <div className=" shadow-md bg-slate-800 ">
      <div className=" flex justify justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-400"> SV </span>
            <span className="text-slate-300">Estate</span>
          </h1>
        </Link>

        <form  onSubmit={handleSubmit} className=" flex gap-x-3 bg-slate-100 p-3 rounded-lg">
          <input onChange={(e)=>setsearchTerm(e.target.value)}
            className="focus:outline-none w-64 sm:w-64"
            type="text"
            placeholder="Search ..."
            value={searchTerm}
          ></input>

          <button><FaSearch className="text-slate-600"></FaSearch></button>
        </form>
          
      
        <ul className="flex justify-between items-center gap-8">

         
          <Link to={"/"}>
            <li className=" text-amber-400 hidden sm:inline  hover:text-gray-300  ">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className=" text-amber-400 hidden sm:inline hover:text-gray-300">
              About
            </li>
          </Link>


          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className=" h-10 rounded w-7 object-cover "
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" sm:inline  text-amber-400  hover:text-gray-300">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
