import React, { Component, useEffect, useState } from 'react'
import './App.css'
import SelectDir from './pages/SelectDir'
import useResources from './hooks/useResources'
import MainPage from './pages/MainPage'

const App = () => {
    const {currentpath,setCurrentpath,setCategories} = useResources()
    useEffect(() => {
      console.log('currentpath>>>', currentpath)
  }, [currentpath])

  return (
      <div className='App w-screen h-screen'>
          {/* {currentpath ? <MainPage currentpath={currentpath} /> : <SelectDir setCurrentpath={setCurrentpath} setCategories={setCategories} />} */}
          <MainPage currentpath={currentpath} setCurrentpath={setCurrentpath} setCategories={setCategories} />
        
    </div>
  )

}

export default App