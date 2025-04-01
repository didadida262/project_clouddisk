import React, { Component, useEffect, useState } from 'react'
import './App.css'
import SelectDir from './components/SelectDir'
import useResources from './hooks/useResources'

const App = () => {
    const {currentpath} = useResources()
  useEffect(() => {
  }, [])

  return (
      <div className='App w-screen h-screen'>
          {currentpath? <div className='text-[white]'>内容去</div>:<SelectDir />}
        
    </div>
  )

}

export default App