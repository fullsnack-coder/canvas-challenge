import { ChangeEventHandler, useCallback, useState } from "react"
import s from "./App.module.css"

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
    <div className={s.App}>
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
              renderValue={(value) => {
                if (!isChanging) return null
                return <div className={`${s.blurWidget}`}>{`${value}%`}</div>
              }}
              value={blurLevel}
            />
            <br />
            <button
              className={`${s.toggleFiltersBtn} ${
                grayScale ? "" : s.colorfull
              }`}
              onClick={() => setIsEnabledFilters((prev) => !prev)}
            >
              Snyder-cut filter: {`${grayScale ? "enabled" : "disabled"}`}
            </button>
          </div>
        )}
      />
    </div>
  )
}

export default App
