import React from "react"
import Wrapper from "../system/Wrapper"
import styled from "styled-components"
import { useUser } from "../../lib/hooks"
import Obfuscate from "react-obfuscate"

const FooterWrapper = styled.div<{ centered?: boolean }>`
  height: 44px;
  /* text-align: center; */
  font-size: 0.875rem;
  ${(p) => (p.centered ? "text-align: center" : "")};
  color: ${(p) => p.theme.colors.textSecondary};
  & a {
    color: ${(p) => p.theme.colors.textSecondary};
  }
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    font-size: 0.75rem;
  }
`

const Footer: React.FC<{ isPublic?: boolean }> = ({ isPublic }) => {
  const user = useUser()
  return (
    <FooterWrapper centered={isPublic}>
      <Wrapper>
        Heirloom · Made by{" "}
        <a href="https://hrescak.com" target="_blank" rel="noreferrer">
          Matej
        </a>{" "}
        {!isPublic && (
          <span>
            ·{" "}
            <Obfuscate
              email="matej@useheirloom.com"
              headers={{
                subject: "I have thoughts",
                body: `Hi, My name is ${user?.name} and i have following thoughts about :\n\n-\n-\n\n Thanks!\n ${user?.name} - ${user?.email}`,
              }}
            >
              Send Feedback
            </Obfuscate>
          </span>
        )}
        &nbsp;·{" "}
        <a
          href="https://github.com/hrescak/useheirloom"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </Wrapper>
    </FooterWrapper>
  )
}

export default Footer
