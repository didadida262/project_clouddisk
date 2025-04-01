import { useEffect, useState } from 'react'

const useResources = () => {
  const [currentpath, setCurrentpath] = useState('D:\\RESP')
  const [categories, setCategories] = useState([])
  useEffect(() => {
    console.log('currentpath>>>', currentpath)
  }, [currentpath])

  return {
    currentpath,
    categories,
    setCurrentpath,
    setCategories,
  }
}

export default useResources
