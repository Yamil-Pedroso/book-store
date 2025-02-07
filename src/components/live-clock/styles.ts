
import styled from "styled-components";

interface IBookReadProps {
  isHeightToHigh: number;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BookListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

`;

export const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20rem;
  width: 100%;
  gap: 20px;
  text-align: center;
`;

export const DropZoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 2rem;
    color: #272935;
  }
`;

export const DropZone = styled.div<IBookReadProps>`
  width: 300px;
  min-height: 12rem;
  max-height: 600px;
  height: auto;
  overflow-y: ${(props) => (props.isHeightToHigh >= 600 ? "auto" : "visible")};
  overflow-x: hidden;
  background-color: #272935;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  color: #555;
  padding: 2rem;
  border-radius: 10px;
  margin-right: 1rem;
  gap: 10px;
  background: linear-gradient(135deg, #272935, #31314c);
  position: relative;

  .user-info {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .num-book-read {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #ff4d4d;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 1rem;
    right: 1rem;

    span {
      font-weight: bold;
      font-size: 1rem;
      color: #ffffff;
    }
  }


  .book {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 7.5rem;
    background-color: #1c1c1d;
    border-radius: 5px;

    border: 1px solid #653636;

    p {
      font-size: 1rem;
      color: #fff;
      margin-right: 10px;
      margin-top: 5rem;
    }

    .book-cover {
      width: 7rem;
      height: auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export const ResetButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #cc0000;
  }
`;

export const DirArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-top: 20px;
  width: 100%;
  position: absolute;
  top: 45rem;
  right: 29rem;

  .a-back, .a-next {
    width: 8rem;
    height: 3rem;
    background-color: #2b2c3c;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    position: relative;
  }

  .a-back::before {
    content: "";
    position: absolute;
    left: -20px;

    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 20px solid #2b2c3c;
  }

  .a-next::after {
    content: "";
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 20px solid #2b2c3c;
  }
`;
