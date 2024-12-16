import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import { Routes ,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Header/>
        <Routes>
          <Route path='/about' element={<About/>}></Route>
          
        </Routes>
    <Footer/>
    </>
  )
}

export default App