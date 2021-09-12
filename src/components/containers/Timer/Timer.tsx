import { useCallback } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

import * as s from "./styles"

interface Props {
  isRunning: boolean
  time: {
    seconds: string
    minutes: string
  }
  controls: {
    play?: () => void
    stop?: () => void
  }
}

const Timer: React.FC<Props> = ({ isRunning, time, controls }) => {
  const { play, stop } = controls
  const handleStopTimer = useCallback(() => {
    if (isRunning) stop?.()
    else play?.()
  }, [isRunning, stop, play])

  return (
    <s.wrapper>
      <p>{time.minutes}</p>:<p>{time.seconds}</p>
      <s.button onClick={handleStopTimer} data-cy="btn-pausetimer">
        {isRunning ? <FaPause color="#fff" /> : <FaPlay color="#fff" />}
      </s.button>
    </s.wrapper>
  )
}

export default Timer
