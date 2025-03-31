import { useState } from 'react'

const usePath = () => {
  const [currentpath, setcurrentpath] = useState('asdasd')
  return {
    currentpath,
  }
}

export default usePath
