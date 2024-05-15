import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreatingListing from './pages/CreatingListing'
import UpdateList from './pages/UpdateList'
import Listing from './pages/Listing'
import Search from './pages/Search'
export default function App() {
  return (

 <BrowserRouter >
 
 <Header></Header>
 <Routes>
  <Route path='/' element={<Home></Home>}/>
  <Route path='/sign-in' element={<Signin></Signin>}></Route>
  <Route path='/sign-up' element={<Signup></Signup>}></Route>
  <Route path='/about' element={<About></About>}></Route>
  <Route path='/search' element={<Search></Search>}></Route>
  <Route path='/listing/:listingId' element={<Listing></Listing>}></Route>
  <Route element={<PrivateRoute/>}>
     <Route path='/profile' element={<Profile></Profile>}></Route>
     <Route path='/create-listing' element={<CreatingListing></CreatingListing>}></Route>
     <Route path='/update-listing/:listingId' element={<UpdateList></UpdateList>}></Route>
  </Route>
  


 
 </Routes>
 </BrowserRouter>
  )
}


