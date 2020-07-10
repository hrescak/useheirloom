import React, { ReactNode } from "react"
import Wrapper from "../system/Wrapper"
import Meta from "./Meta"
import styled from "styled-components"
import Footer from "./Footer"
import Head from "next/head"
import useScrollPosition from "@react-hook/window-scroll"

type Props = {
  children: ReactNode
  title?: string
  invertHeader?: boolean
  leftControl?: ReactNode
  rightControl?: ReactNode
  signedOut?: boolean
}

const PageWrap = styled.div`
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 128px;
  margin-bottom: -44px;
  &:after {
    content: "";
    display: block;
  }
`

const HeaderWrapper = styled.header<{ reverse?: boolean; shadow?: boolean }>`
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 44px;
  background: ${(p) => (p.reverse ? "#000" : p.theme.colors.background)};
  margin-bottom: 2rem;
  transition: ${(p) => p.theme.transition};
  box-shadow: ${(p) =>
    p.shadow && !p.reverse ? "0px 1px 2px rgba(0,0,0,.2)" : ""};
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Layout: React.FC<Props> = (props) => {
  const scrollY = useScrollPosition(30)
  return (
    <>
      <PageWrap>
        <Meta title={props.title} />
        <Head>
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content={props.invertHeader ? "black" : "default"}
          />
        </Head>
        {!props.signedOut && (
          <HeaderWrapper reverse={props.invertHeader} shadow={scrollY > 30}>
            <Wrapper>
              <InnerWrapper>
                {props.leftControl}
                <div style={{ flex: 2 }} />
                {props.rightControl}
              </InnerWrapper>
            </Wrapper>
          </HeaderWrapper>
        )}
        <Wrapper style={{ paddingTop: "88px" }}>
          <div>{props.children}</div>
        </Wrapper>
      </PageWrap>
      <Footer />
      <script
        data-goatcounter="https://heirloom.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>
    </>
  )
}

export default Layout
