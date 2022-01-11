import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import AllProducts from './components/AllProducts'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllProducts/>
    </div>
  )
}

export default App
