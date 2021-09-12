import { useCallback } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

import s from "./Timer.module.css"

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
    <div className={s.timer}>
      <p>{time.minutes}</p>:<p>{time.seconds}</p>
      <button onClick={handleStopTimer} className={s.timerButton}>
        {isRunning ? <FaPause color="#fff" /> : <FaPlay color="#fff" />}
      </button>
    </div>
  )
}

export default Timer
