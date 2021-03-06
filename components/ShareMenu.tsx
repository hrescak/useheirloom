import { Share, Globe } from "react-feather"
import styled from "styled-components"
import { InlineButton } from "./system/Button"
import Popover from "./system/Popover"
import { RecipeProps } from "../types"
import Switch from "react-switch"
import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import useRecipe from "../lib/useRecipe"

const SwitchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  width: 280px;
  cursor: pointer;
  &:hover {
    background: ${(p) => p.theme.colors.wash};
  }
`
const URLRow = styled.div`
  padding: 1rem;
  border-top: 1px solid ${(p) => p.theme.colors.wash};
  & pre {
    margin: 0;
    padding: 0.5rem;
    background: ${(p) => p.theme.colors.wash};
    font-size: 0.75rem;
    color: ${(p) => p.theme.colors.textSecondary};
    overflow: scroll;
    border-radius: 4px;
  }
  a,
  button {
    font-size: 0.875rem;
    color: ${(p) => p.theme.colors.textSecondary};
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
    border: 0;
    background: none;
  }
`
const FlexRow = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`

interface ShareMenuProps {
  recipe: RecipeProps
}
const ShareMenu: React.FC<ShareMenuProps> = (props) => {
  const [copied, setCopied] = useState(false)
  const [publicChecked, setPublicChecked] = useState(props.recipe.isPublic)
  const { updateRecipe } = useRecipe()
  async function onSwitchChange(checked) {
    // make sure we only send the public change
    const newData = {
      isPublic: checked,
    }
    await updateRecipe(newData)
    setPublicChecked(checked)
  }
  const copyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }
  return (
    <div>
      <Popover
        content={
          <>
            <SwitchRow onClick={() => onSwitchChange(!publicChecked)}>
              <div style={{ flex: 2 }}>Share to the web</div>
              <Switch
                checked={publicChecked}
                onChange={onSwitchChange}
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </SwitchRow>
            {props.recipe.isPublic && (
              <URLRow>
                <pre>/r/{props.recipe.publicID}</pre>
                <FlexRow>
                  <a
                    href="https://www.notion.so/Sharing-2cf1a914b42744fc80062b81b694f9de"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn about Sharing
                  </a>
                  <div style={{ flex: 2 }} />
                  <CopyToClipboard
                    text={`https://useheirloom.com/r/${props.recipe.publicID}`}
                    onCopy={copyLink}
                  >
                    <button>{copied ? "Copied!" : "Copy Link"}</button>
                  </CopyToClipboard>
                </FlexRow>
              </URLRow>
            )}
          </>
        }
        trigger="click"
        interactive={true}
      >
        <InlineButton icon={props.recipe.isPublic ? <Globe /> : <Share />}>
          {props.recipe.isPublic ? "Public" : "Share"}
        </InlineButton>
      </Popover>
    </div>
  )
}

export default ShareMenu
