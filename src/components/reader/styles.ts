import styled, { keyframes } from "styled-components";

interface IProps {
  zoomWindow: boolean;
  showBorderDynamic: boolean;
}

const borderAnimation = keyframes`
0% { border-color: rgba(100, 149, 237, 1); }   
  25% { border-color: rgba(186, 85, 211, 1); }  
  50% { border-color: rgba(123, 104, 238, 1); }  
  75% { border-color: rgba(219, 112, 147, 1); }  
  100% { border-color: rgba(100, 149, 237, 1); }
`;

export const ReaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
   width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #181818;
  color: #e0e0e0;
  font-family: "Merriweather", serif;
  padding: 2rem;
  gap: 5rem;
`;

export const ReaderWrapper = styled.div`
  display: flex;
  position: relative;
  `;

export const AIRecommendationWrapper = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 10px;
  margin-top: .5rem;
  font-weight: bold;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  width: ${(props) => (props.zoomWindow ? "50rem" : "29rem")};
  height: ${(props) => (props.zoomWindow ? "20rem" : "22rem")};
  position: ${(props) => (props.zoomWindow ? "absolute" : "relative")};
  right: ${(props) => (props.zoomWindow ? "2rem" : "0")};
  bottom: ${(props) => (props.zoomWindow ? "10rem" : "0")};
  background: ${(props) => (props.zoomWindow ? "#070707" : "transparent")};
  color: ${(props) => (props.zoomWindow ? "#3b3b3b" : "#b0b0b0")};
  border: ${(props) =>
    props.showBorderDynamic ? "2px solid #3b3b3b" : "none"};
  transition: border .6s ease-in-out;
  animation: ${borderAnimation} 3s infinite linear;
`;

export const AIRecommendationBox = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  margin-top: 2rem;

  .icon {
    font-size: 1.5rem;
    cursor: pointer;
    color: #464646;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #9e9e9e;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BookTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
`;

export const BookAuthor = styled.h3`
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
`;

export const BookContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const BookContent = styled.div`
  flex-basis: 800px;
  flex-shrink: 0;
  flex-grow: 0;
  height: 80vh;
  display: flex;
  justify-content: center;
  background: #1e1e1e;
  border-radius: 10px;
  padding: 1.5rem;
  overflow-y: auto;
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: justify;
  white-space: pre-wrap;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  div {

  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
  font-size: 1.1rem;
`;

export const PageButton = styled.button`
  background: #444;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #666;
  }

  &:disabled {
    background: #333;
    cursor: not-allowed;
  }
`;

export const TimerControls = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

export const ReadingTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  gap: 3rem;
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 2rem;
  border-radius: 8px;
  position: relative;
`;

export const TimeReading = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: .3rem;
  }
`;

export const ReadingProcess = styled.div`
   text-decoration: underline;

  a {
    font-size: .9rem;
    color: #b0b0b0;

    &:hover {
      color: #d77575;
    }
  }
`;
