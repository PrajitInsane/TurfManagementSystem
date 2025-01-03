import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Contacts from './components/Contacts'
import Login from './components/Login'
import Profile from './components/Profile'
import SignUp from './components/SignUp'
import Home from './components/Home'
import { Routes ,Route} from 'react-router-dom'
import BookingHistory from './components/BookingHistory'
import CancelBooking from './components/CancelBooking'


const App = () => {
  return (
    <>
    
    <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contacts/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='history' element={<BookingHistory/>}></Route>
         <Route path='/cancel' element={<CancelBooking/>}></Route>
        {/* Protect this route */}
        <Route path="/profile" element={<Profile />} />
        </Routes>
    <Footer/>
    </>
  )
}

export default App