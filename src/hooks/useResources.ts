import { useState } from 'react'

const useResources = () => {
  const [currentpath, setCurrentpath] = useState('')
  const [categories, setCategories] = useState([])
  return {
    currentpath,
    categories,
    setCurrentpath,
    setCategories,
  }
}

export default useResources
