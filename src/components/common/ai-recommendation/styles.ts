import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'RetroGaming';
    src: url('/fonts/RetroGaming.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const zoomInOut = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
`;

export const Window = styled.div<{ zoom: boolean }>`
  width: ${({ zoom }) => (zoom ? "35rem" : "28rem")};
  height: ${({ zoom }) => (zoom ? "25rem" : "19rem")};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  position: relative;
  animation: ${({ zoom }) => (zoom ? zoomInOut : "none")} 0.3s ease-in-out;

  .zoom-icon-out {
    position: absolute;
    top: 0rem;
    right: 0rem;
    cursor: pointer;
    color: #666666;
    z-index: 1;
  }

  .zoom-icon-in {
    position: absolute;
    top: 0rem;
    right: -13rem;
    cursor: pointer;
    color: #666666;
    z-index: 1;
  }

  .footer span {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
  }

  .footer svg {
    width: 16px;
    height: 16px;
  }
`;
export const TitleBar = styled.div``;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  margin-right: 1rem;
  margin-top: 0rem;
  cursor: pointer;

  p {
    margin: 0.5rem 0.4rem;
  }
`;

export const WindowContent = styled.div`
  padding: 0.5rem;
  margin-top: auto;
  p {
    color: #000000;
  }
`;

export const MessageContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0.5rem;
  font-size: 1rem;
  color: #666666;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #0b0b0b;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  scrollbar-width: thin;
  scrollbar-color: #4d4d4d #121212;

  .sms-sender {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;

    span {
      margin-left: 0.5rem;
      margin-top: 0.2rem;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #121212;

      .user-avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;

        filter: brightness(0.7);
      }
    }
  }
`;

export const CloseButton = styled.div`
  padding: 0.2rem 0.5rem;
  background-color: #c0c0c0;
  color: #666666 !important;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.1s ease-in-out;

  &:active {
    transform: translate(2px, 2px);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .up-arrow,
  .stop-icon {
    padding: 1rem;
    //background-color: #121212;
    color: #666666;
    cursor: pointer;
    position: absolute;
    right: 0.5rem;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: "Roboto", sans-serif;
  color: #666666;
  position: relative;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #666666;
  }

  .up-arrow-container {
  }
`;
