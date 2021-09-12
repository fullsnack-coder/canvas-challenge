import { ComponentProps } from "react"
import s from "./input.module.css"

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
      <div className={s.wrapper} style={containerStyle}>
        {renderValue?.(rest.value)}
        <input type={type} {...rest} />
      </div>
    )
  }
  return <input type={type} {...rest} />
}

export default Input
