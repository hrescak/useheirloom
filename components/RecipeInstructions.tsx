import React from "react"
import ReactMarkdown from "react-markdown"
import { P, List, Heading } from "./system/Typography"
import withHighlight from "./hoc/withHighlight"

const RecipeInstructions: React.FC<{ instructions?: string }> = (props) => {
  return props.instructions ? (
    <ReactMarkdown
      source={props.instructions}
      renderers={{
        paragraph: withHighlight(P),
        list: List,
        listItem: withHighlight("li"),
        heading: Heading,
      }}
    />
  ) : (
    <>"No instructions yet."</>
  )
}

export default RecipeInstructions
