import { useState, useEffect } from "react";
import styled from "styled-components";

// Define un tipo para los libros
interface Book {
  id: number;
  title: string;
  cover: string;
  startTime: number;
}

// Lista inicial de libros
const initialBooks: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    cover: "https://i.pinimg.com/originals/07/7e/22/077e221ae4eb2b8975a6619d009eef14.jpg",
    startTime: Date.now() - 3600000, // 1 hora de lectura
  },
  {
    id: 2,
    title: "1984",
    cover: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png",
    startTime: Date.now() - 5400000, // 1.5 horas de lectura
  },
  {
    id: 3,
    title: "Dune",
    cover: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe78bf586-4ce5-471a-af75-bdeb6f7757f2_1200x1850.jpeg",
    startTime: Date.now() - 7200000, // 2 horas de lectura
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

const BookList = styled.div`
  display: flex;
  gap: 20px;
  text-align: center;
`;

const DropZoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DropZone = styled.div`
  width: 300px;
  height: 400px;
  border: 2px dashed #aaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  padding: 10px;
  overflow-y: auto;
`;

const ResetButton = styled.button`
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

const LiveClock = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : initialBooks;
  });

  const [readBooks, setReadBooks] = useState<Book[]>(() => {
    const savedReadBooks = localStorage.getItem("readBooks");
    return savedReadBooks ? JSON.parse(savedReadBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [books, readBooks]);

  const getTimeElapsed = (startTime: number) => {
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const bookId = event.dataTransfer.getData("bookId");
    const book = books.find((b) => b.id.toString() === bookId);
    if (book) {
      setReadBooks((prev) => [...prev, book]);
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
    }
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLImageElement>, bookId: number) => {
    event.dataTransfer.setData("bookId", bookId.toString());
  };

  const resetBooks = () => {
    setBooks(initialBooks);
    setReadBooks([]);
    localStorage.removeItem("books");
    localStorage.removeItem("readBooks");
  };

  return (
    <Container>
      <BookList>
        {books.map((book) => (
          <div key={book.id} style={{ maxWidth: "20rem", overflow: "hidden" }}>
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                cursor: "grab",
              }}
              draggable
              onDragStart={(event) => handleDragStart(event, book.id)}
            />
            <h3 style={{ fontSize: "2rem", margin: "10px 0", color: "#2a2a2a" }}>{book.title}</h3>
            <p style={{ fontSize: "1.5rem", color: "#555" }}>
              Time Read:{" "}
              <span style={{ color: "#333", fontWeight: "bold", fontSize: "1.5rem" }}>
                {getTimeElapsed(book.startTime)}
              </span>
            </p>
          </div>
        ))}
      </BookList>
      <DropZoneWrapper>
      <DropZone onDrop={handleDrop} onDragOver={allowDrop}>
        <p>Books Readed</p>
        {readBooks.map((book) => (
          <div key={book.id}>
            <img src={book.cover} alt={book.title} style={{ width: "80px", borderRadius: "5px" }} />
            <h4>{book.title}</h4>
          </div>
        ))}

      </DropZone>
        <ResetButton onClick={resetBooks}>Reset Books</ResetButton>
        </DropZoneWrapper>
    </Container>
  );
};

export default LiveClock;
