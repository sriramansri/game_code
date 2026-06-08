import React from 'react'
import Game from './layouts/Game'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './layouts/Home';
import TwoPlayerGame from './layouts/Twopalayergame';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cpu' element={<Game/>}/>
      <Route path='/twoplay' element={<TwoPlayerGame/>}/>
      </Routes>
    </BrowserRouter>
      // <Home/>
    
  )
}

export default App