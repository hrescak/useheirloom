import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { PrimaryButton } from "./system/Button"
import Wrapper from "./system/Wrapper"

const Snackbar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  bottom: 1rem;
  left: 0;
  right: 0;
  color: ${(p) => p.theme.colors.inverseText};
  background: ${(p) => p.theme.colors.inverseBackground};
  border-radius: 0.5rem;
  padding: 1rem;
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    left: 1rem;
    right: 1rem;
  }
`

const InstallBar: React.FC = (props) => {
  const [needsInstall, setNeedsInstall] = useState(false)

  const reloadClicked = () => {
    window.workbox.addEventListener("controlling", (event) => {
      window.location.reload()
    })
    window.workbox.messageSW({ type: "SKIP_WAITING" })
  }
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      window.workbox.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      window.workbox.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      window.workbox.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      window.workbox.addEventListener("waiting", (event) => {
        setNeedsInstall(true)
      })
      // never forget to call register as auto register is turned off in next.config.js
      window.workbox.register()
    }
  }, [])
  return (
    needsInstall && (
      <Wrapper style={{ position: "relative" }}>
        <Snackbar>
          <div style={{ flex: 2 }}>A new version was installed. </div>
          <PrimaryButton onClick={() => reloadClicked()}>Reload</PrimaryButton>
        </Snackbar>
      </Wrapper>
    )
  )
}

export default InstallBar
