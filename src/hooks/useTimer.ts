import { useCallback, useEffect, useMemo, useState } from "react"

type HookResult = {
  minutes: string
  seconds: string
  isRunning: boolean
  play: () => void
  stop: () => void
}

const useTimer = (): HookResult => {
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const play = useCallback(() => {
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  const seconds = useMemo(() => {
    return counter < 60 ? counter : Math.floor(counter % 60)
  }, [counter])

  const minutes = useMemo(() => {
    return Math.floor(counter / 60)
  }, [counter])

  useEffect(() => {
    if (!isRunning) return
    const timeout = setTimeout(() => {
      setCounter(counter + 1)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [isRunning, counter])

  return {
    minutes: `0${minutes}`.slice(-2),
    seconds: `0${seconds}`.slice(-2),
    isRunning,
    play,
    stop,
  }
}

export default useTimer
