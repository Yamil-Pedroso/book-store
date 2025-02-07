import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBookReader } from "react-icons/fa";

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
    cover:
      "https://i.pinimg.com/originals/07/7e/22/077e221ae4eb2b8975a6619d009eef14.jpg",
    startTime: Date.now() - 3600000, // 1 hora de lectura
  },
  {
    id: 2,
    title: "1984",
    cover:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png",
    startTime: Date.now() - 5400000, // 1.5 horas de lectura
  },
  {
    id: 3,
    title: "Dune",
    cover:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe78bf586-4ce5-471a-af75-bdeb6f7757f2_1200x1850.jpeg",
    startTime: Date.now() - 7200000, // 2 horas de lectura
  },
  {
    id: 4,
    title: "The Lord of the Rings",
    cover:
      "https://www.pagesofhackney.co.uk/wp-content/uploads/2023/03/710iAkPYPzL.jpg",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
];

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20rem;
  width: 100%;
  gap: 20px;
  text-align: center;
`;

const DropZoneWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 2rem;
    color: #272935;
  }
`;

const DropZone = styled.div`
  width: 300px;
  height: auto;
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

  const handleDragStart = (
    event: React.DragEvent<HTMLImageElement>,
    bookId: number
  ) => {
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
            <div
              style={{
                width: "100%",
                height: "450px",
                overflow: "hidden",
                borderRadius: "10px",
                boxShadow: "10px 10px 25px 19px rgba(0,0,0,0.4)",
                marginBottom: "10px",

              }}
            >
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                cursor: "grab",
                objectFit: "cover",

              }}
              draggable
              onDragStart={(event) => handleDragStart(event, book.id)}
            />

            </div>
            <h3
              style={{ fontSize: "2rem", margin: "10px 0", color: "#2a2a2a" }}
            >
              {book.title}
            </h3>
            <p style={{ fontSize: "1.5rem", color: "#555" }}>
              Time Read:{" "}
              <span
                style={{
                  color: "#d77575",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {getTimeElapsed(book.startTime)}
              </span>
            </p>
          </div>
        ))}
      </BookList>
      <DropZoneWrapper>
        <DropZone onDrop={handleDrop} onDragOver={allowDrop}>
          {readBooks.length > 0 ? (
            readBooks.map((book) => (
              <motion.div
                key={book.id}
                className="book"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className="book-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <p>{book.title}</p>
              </motion.div>
            ))
          ) : (
            <motion.p
            initial={{ opacity: 0 , x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            style={{ color: "#d77575", fontSize: "1.5rem", textAlign: "center" }}
          >
            No tienes libros leídos <FaBookReader style={{ fontSize: "2rem", marginLeft: ".5rem", color: "#fff" }} />
          </motion.p>
          )}
        <ResetButton onClick={resetBooks}>Reset Books</ResetButton>
        </DropZone>

      </DropZoneWrapper>
    </Container>
  );
};

export default LiveClock;
