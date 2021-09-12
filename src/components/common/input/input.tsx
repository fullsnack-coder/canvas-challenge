import { ComponentProps } from "react"

import * as s from "./input.styles"

type Props = ComponentProps<"input"> & {
  containerStyle?: React.CSSProperties
  renderValue?: (value: ComponentProps<"input">["value"]) => JSX.Element | null
}

const Input: React.FC<Props> = ({
  type,
  containerStyle,
  renderValue,
  ...rest
}) => {
  if (type === "range") {
    return (
      <s.wrapper style={containerStyle}>
        {renderValue?.(rest.value)}
        <input type={type} {...rest} />
      </s.wrapper>
    )
  }
  return <input type={type} {...rest} />
}

export default Input
