import styled from "styled-components";

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
  height: 72vh;
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
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 2rem;
  border-radius: 8px;
  position: relative;
`;
