import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Contacts from './components/Contacts'
import { Routes ,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Header/>
        <Routes>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contacts/>}></Route>
          <Route path='/login'></Route>
        </Routes>
    <Footer/>
    </>
  )
}

export default App