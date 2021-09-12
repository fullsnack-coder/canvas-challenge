import styled from "styled-components"

export const video = styled.video`
  display: none;
`

export const renderedBox = styled.canvas`
  max-height: 600px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  transform: rotateY(180deg);
`

export const btnSettings = styled.div`
  cursor: pointer;
  position: absolute;
  top: 45px;
  right: 45px;
  z-index: 1;
`

export const wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const settingsBox = styled.div`
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.644);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 8px;
  animation: appear 0.12s ease-out forwards;

  @keyframes appear {
    from {
      opacity: 0.5;
    }

    to {
      opacity: 1;
    }
  }
`
export const errorWrapper = styled.div`
  background-color: #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  max-width: 600px;
  width: 100%;
`

export const errorMessage = styled.h2`
  color: white;
`

export const btnRequest = styled.button`
  border-radius: 8px;
  padding: 12px;
  background-color: #fff;
  border: none;
`
