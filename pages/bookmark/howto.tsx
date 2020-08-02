import { WithUser } from "../../components/hoc/withUser"
import LoggedInLayout from "../../components/layout/LoggedInLayout"

import styled from "styled-components"
import { H1, P, H2 } from "../../components/system/Typography"
import Stack from "../../components/system/Stack"

const Bookmarklet = styled.a`
  background: ${(p) => p.theme.colors.accentWash};
  color: ${(p) => p.theme.colors.text};
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
`
const Pre = styled.pre`
  font-size: 0.75rem;
  background: ${(p) => p.theme.colors.wash};
  color: ${(p) => p.theme.colors.textSecondary};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
`
const A = styled.a`
  color: ${(p) => p.theme.colors.text};
  font-weight: 600;
`
const ImageWrapper = styled.div`
  margin-left: 1rem;
  text-align: center;
  > img {
    width: 210px;
    border-radius: 0.5rem;
    margin: 0.5rem auto;
  }
`
const bookmarkHref =
  "javascript:(function(){open('https://useheirloom.com/bookmark?url='+encodeURI(location.href))})();"

const Howto: React.FC = () => {
  const onPreClick = (e) => {
    if (window.getSelection) {
      var range = document.createRange()
      range.selectNode(e.target)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  }
  return (
    <LoggedInLayout>
      <H1>Saving recipes from the web</H1>
      <P>
        With the Heirloom bookmarklets for desktop and mobile, you can save a
        recipe to Heirloom and make sure you have the format you need to cook
        your next delicious meal. You can save from more than 30 most popular
        recipe websites.
      </P>
      <H2 style={{ marginTop: "2rem" }}>Saving from a desktop browser</H2>
      <P>
        Drag this link →{" "}
        <Bookmarklet href={bookmarkHref}>Add to Heirloom</Bookmarklet> up to
        your browser's Bookmark Bar and you're done!
      </P>
      <H2 style={{ marginTop: "2rem" }}>Saving on iOS using Shortcuts</H2>
      <Stack row style={{ alignItems: "stretch" }}>
        <div style={{ flex: 1 }}>
          <P>
            Shortcuts on iOS let you create a universal action in Mobile Safari
            that's very convenient. You can install it by following{" "}
            <Bookmarklet href="https://www.icloud.com/shortcuts/160c641a62f64ed9836a581482e849fe">
              this link
            </Bookmarklet>
            .
          </P>
          <P>
            If this is your first time using a custom shortcut on, you'll likely
            need to enable shared shortcuts. See how in{" "}
            <A
              href="https://support.apple.com/en-us/HT210628"
              target="_blank"
              rel="noreferrer"
            >
              this guide{" "}
            </A>{" "}
            by Apple.
          </P>
        </div>
        <ImageWrapper>
          <img
            src="/images/ios_shortcut.png"
            alt="Screenshot of iOS Safari Share sheet showing a Add to Heirloom shortcut"
          />
        </ImageWrapper>
      </Stack>
      <H2 style={{ marginTop: "1rem" }}>Everywhere else</H2>
      <P>
        On Android and everywhere else, create a regular new bookmark in your
        browser and use the following code as the URL:
        <Pre onClick={onPreClick}>{bookmarkHref}</Pre>
      </P>
      <P>
        If you encounter any issues with these bookmarklets, feel free to{" "}
        <A
          href="https://github.com/hrescak/useheirloom/issues"
          target="_blank"
          rel="noreferrer"
        >
          open a new Github issue
        </A>
        .
      </P>
    </LoggedInLayout>
  )
}

export default WithUser(Howto)
