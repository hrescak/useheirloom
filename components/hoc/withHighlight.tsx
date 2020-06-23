import { useEffect, useRef, useState } from "react"
import theme from "../system/theme"
const withHighlight = (Component) => {
  return (props) => {
    const [highlighted, setHighlighted] = useState(false)
    const node = useRef<HTMLDivElement>()

    const handleClick = (event: MouseEvent) => {
      if (node.current && node.current.contains(event.target as Node)) {
      } else {
        setHighlighted(false)
      }
    }

    useEffect(() => {
      document.addEventListener(
        "mousedown",
        handleClick as (this: Document, ev: MouseEvent) => void,
        false
      )
      return () =>
        document.removeEventListener(
          "mousedown",
          handleClick as (this: Document, ev: MouseEvent) => void,
          false
        )
    }, [])
    return (
      <div
        style={{ background: highlighted ? theme.colors.accentWash : "none" }}
        ref={node}
        onClick={(e) => setHighlighted(true)}
      >
        <Component {...props} />
      </div>
    )
  }
}

export default withHighlight
