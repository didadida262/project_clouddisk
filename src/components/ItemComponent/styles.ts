import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  height: 42px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: left;
  background: rgb(51,51,51);
  border-radius: 8px;
  color: #FFF;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
    border: 1px solid black;
  }
  margin-bottom: 5px;
`
