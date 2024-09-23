import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeaderComponents from './components/HeaderComponents'
import MainComponents from './components/MainComponents'
import { ContextProvider } from './store/context'

function App() {

  return (
    <ContextProvider>
      <HeaderComponents></HeaderComponents>
      <MainComponents></MainComponents>
    </ContextProvider>
  )
}

export default App
