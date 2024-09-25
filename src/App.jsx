import { useState } from 'react'
import {useCallback} from 'react'
import { useEffect } from 'react'
import './App.css'
import Header from './Header'
import MainClock from './MainClock'
function App() {
  return (
    <>
    <Header/>
    <MainClock/>
    </>
  )
}

export default App
