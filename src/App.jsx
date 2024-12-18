import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Contacts from './components/Contacts'
import Login from './components/Login'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import { Routes ,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Header/>
        <Routes>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contacts/>}></Route>
          <Route path="/login" element={<Login />} />
        
        {/* Protect this route */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
    <Footer/>
    </>
  )
}

export default App