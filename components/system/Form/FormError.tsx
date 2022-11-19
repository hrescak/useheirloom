import styled from "styled-components"
import { AlertTriangle } from "react-feather"
import { useEffect, useState } from "react"
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

const Err = styled.div<{ separateRow?: boolean }>`
  position: ${(p) => (p.separateRow ? "relative" : "absolute")};
  right: ${(p) => (p.separateRow ? "auto" : "1rem")};
  bottom: ${(p) => (p.separateRow ? "auto" : "-0.5rem")};
  background: ${(p) => p.theme.colors.errorWash};
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.error};
`
const ErrWrapper = styled.div<{ separateRow?: boolean; wiggle?: boolean }>`
  position: relative;
  height: ${(p) => (p.separateRow ? "auto" : "0px")};
  animation: ${(p) =>
    p.wiggle ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both" : ""};
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`

export const FormError: React.FC<{
  title?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  separateRow?: boolean
}> = ({ title, separateRow }) => {
  const [wiggle, setWiggle] = useState(false)
  const [prevTitle, setPrevTitle] = useState("")
  useEffect(() => {
    console.log("update, title: " + title + ", prev: " + prevTitle)
    if (prevTitle === title && title) {
      setWiggle(true)
      console.log("update setting wiggle")
      setTimeout(() => {
        setWiggle(false)
        console.log("unsetting wiggle")
      }, 1000)
    }
    if (title) {
      setPrevTitle(title as string)
    }
  }, [title])
  return title ? (
    <ErrWrapper separateRow={separateRow} wiggle={wiggle}>
      <Err separateRow={separateRow}>
        <AlertTriangle
          size={16}
          style={{ verticalAlign: "middle", margin: "-3px 5px 0 0" }}
        />
        {title}
      </Err>
    </ErrWrapper>
  ) : null
}
