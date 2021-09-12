import styled from "styled-components"

export const App = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

export const toggleFiltersBtn = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "#0089ff" : "transparent")};
  cursor: pointer;
  color: #222222;
  text-transform: capitalize;
  font-weight: 700;
  font-size: small;
  padding: 12px 22px;
  border: none;
  border-radius: 25px;
  transition: all ease-out 0.2s;
  background-color: rgba(54, 54, 54, 0.432);
  color: white;
`

export const blurWidget = styled.div`
  position: absolute;
  background-color: #000000;
  color: white;
  left: 80%;
  top: -50px;
  transform: translateX(-50%);
  z-index: 1;
  border-radius: 8px;
  padding: 12px;
`
