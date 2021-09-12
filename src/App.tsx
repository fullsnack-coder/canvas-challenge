import { ChangeEventHandler, useCallback, useState } from "react"
import * as s from "./App.styles"

import VideoCamPlayer from "./components/containers/VideoCamPlayer"
import Input from "./components/common/input"

function App() {
  const [isEnabledFilters, setIsEnabledFilters] = useState(false)
  const [blurLevel, setBlurLevel] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const handleChangeBlurLevel: ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      setBlurLevel(+target.value)
      setIsChanging(true)
    }, [])

  return (
    <s.App>
      <VideoCamPlayer
        grayScale={isEnabledFilters}
        blurLevel={blurLevel}
        renderSettings={({ blurLevel, grayScale }) => (
          <div>
            <p>Blur-Level</p>
            <Input
              type="range"
              onMouseLeave={() => setIsChanging(false)}
              onChange={handleChangeBlurLevel}
              value={blurLevel}
              renderValue={(value) => {
                if (!isChanging) return null
                return <s.blurWidget>{`${value}%`}</s.blurWidget>
              }}
            />
            <br />
            <s.toggleFiltersBtn
              active
              onClick={() => setIsEnabledFilters((prev) => !prev)}
            >
              Snyder-cut filter: {`${grayScale ? "enabled" : "disabled"}`}
            </s.toggleFiltersBtn>
          </div>
        )}
      />
    </s.App>
  )
}

export default App
