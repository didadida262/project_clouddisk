import React, { Component, useEffect, useState } from 'react'
import './App.css'
import SelectDir from './pages/SelectDir'
import useResources from './hooks/useResources'
import MainPage from './pages/MainPage'
import { ResourcesProvider } from './provider/resource-context'

const App = () => {
  const { currentpath, setCurrentpath, setCategories } = useResources()
  useEffect(() => {
    console.log('currentpath>>>', currentpath)
  }, [currentpath])

  return (
    <ResourcesProvider>
      <div className="App w-screen h-screen">
        <MainPage />
      </div>
    </ResourcesProvider>
  )
}

export default App
