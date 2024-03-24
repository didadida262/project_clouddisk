import { ReactNode, ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface InputProps {
  val: String;
}

export function InputComponent (props: InputProps) {
  return (
    <input type="text" value={{props.val}} style={{ height: '40px'}}/>
    )
}
