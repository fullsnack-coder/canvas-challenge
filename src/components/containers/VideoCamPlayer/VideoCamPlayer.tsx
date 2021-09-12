import { useEffect, useRef, useState, useCallback } from "react"
import { FaCogs } from "react-icons/fa"

import * as s from "./VideoCamPlayer.styles"
import Timer from "../Timer"
import useTimer from "../../../hooks/useTimer"
import { transformPixelsIntoGrayScale } from "../../../utils/tools"

type Settings = {
  blurLevel: number
  grayScale: boolean
}

type PermissionsStatus = "pending" | "granted" | "denied"

type Props = {
  grayScale: boolean
  blurLevel?: number
  autoInitRequest?: boolean
  renderSettings?: (settings: Settings) => JSX.Element
  fallbackPermissionsComponent?: JSX.Element
}

const VideoCam: React.FC<Props> = ({
  autoInitRequest = false,
  blurLevel = 0,
  fallbackPermissionsComponent,
  grayScale,
  renderSettings,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [permissionsStatus, setPermissionsStatus] =
    useState<PermissionsStatus>("pending")

  const { play, seconds, isRunning, minutes, stop } = useTimer()

  const requestPermissions = useCallback((): Promise<void> => {
    return navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 600 },
      })
      .then((stream) => {
        play()
        setPermissionsStatus("granted")
        if (videoRef.current) videoRef.current.srcObject = stream
      })
      .catch(() => setPermissionsStatus("denied"))
  }, [play])

  useEffect(() => {
    navigator.permissions
      .query({ name: "camera" as PermissionName })
      .then((res) => {
        setPermissionsStatus(res.state === "granted" ? "granted" : "pending")
        if (res.state === "granted") requestPermissions()
      })
  }, [requestPermissions])

  useEffect(() => {
    if (autoInitRequest) requestPermissions()
  }, [autoInitRequest, requestPermissions])

  const computeContextImage = useCallback(
    (context: CanvasRenderingContext2D) => {
      const imageData = context.getImageData(0, 0, 600, 600)
      transformPixelsIntoGrayScale(imageData)
      context.putImageData(imageData, 0, 0)
    },
    []
  )

  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev)
  }, [])

  const handlePlay = useCallback(() => {
    if (permissionsStatus === "granted") play()
    else requestPermissions()
  }, [play, permissionsStatus, requestPermissions])

  useEffect(() => {
    const interval = setInterval(() => {
      const context = canvasRef.current?.getContext("2d")
      if (context && isRunning) {
        context?.drawImage(videoRef.current!, 0, 0, 600, 600)
        if (grayScale) computeContextImage(context)
      }
    }, 0)
    return () => clearInterval(interval)
  }, [grayScale, computeContextImage, isRunning])

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d")
    if (context) context.filter = `blur(${blurLevel}px)`
  }, [blurLevel])

  return (
    <s.wrapper>
      <Timer
        time={{ minutes, seconds }}
        controls={{ play: handlePlay, stop }}
        isRunning={isRunning}
      />
      <s.video ref={videoRef} autoPlay />
      {permissionsStatus === "granted" ? (
        <>
          {renderSettings && isRunning ? (
            <s.btnSettings
              className={s.btnSettings}
              role="button"
              onClick={toggleSettings}
            >
              <FaCogs color="#fff" size={32} />
            </s.btnSettings>
          ) : null}
          <s.renderedBox ref={canvasRef} height={600} width={600} />
        </>
      ) : (
        fallbackPermissionsComponent || (
          <s.errorWrapper>
            {permissionsStatus === "denied" ? (
              <s.errorMessage>
                Sorry but we need camera permissions to work
              </s.errorMessage>
            ) : (
              <s.btnRequest onClick={requestPermissions}>
                Turn on my camera
              </s.btnRequest>
            )}
          </s.errorWrapper>
        )
      )}
      {showSettings && permissionsStatus === "granted" && isRunning ? (
        <s.settingsBox>
          {renderSettings?.({ blurLevel, grayScale })}
        </s.settingsBox>
      ) : null}
    </s.wrapper>
  )
}

export default VideoCam
