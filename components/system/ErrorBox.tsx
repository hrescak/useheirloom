import React from "react"
import styled from "styled-components"
import { AlertTriangle } from "react-feather"

const ErrorWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${(p) => p.theme.colors.errorWash};
  color: ${(p) => p.theme.colors.error};
  padding: 1rem;
`
const Title = styled.div`
  font-weight: bold;
`

interface ErrorBoxProps {
  children?: React.ReactNode
  title?: string
  message: string
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ title, message }) => {
  return (
    <ErrorWrapper>
      <AlertTriangle style={{ marginRight: "1rem" }} />
      <div>
        {title && <Title>{title}</Title>}
        {message}
      </div>
    </ErrorWrapper>
  )
}

export default ErrorBox
