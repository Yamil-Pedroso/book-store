import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaBookReader } from "react-icons/fa";
import {
  Container,
  BookListWrapper,
  BookList,
  DropZoneWrapper,
  DropZone,
  ResetButton,
  DirArrowWrapper,
} from "./styles";
import { avatar } from "../../assets/images";
import { toast } from "sonner";
import ConfettiComponent from "../common/confetti/Confetti";

interface Book {
  id: number;
  title: string;
  cover: string;
  startTime: number;
}

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
  {
    id: 5,
    title: "The perfume",
    cover:
      "https://i0.wp.com/theblacknarcissus.com/wp-content/uploads/2022/12/bcecb015-e3f9-44f1-8231-6986740f5dd2_rw_600.jpg?ssl=1",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
  {
    id: 6,
    title: "One Hundred Years of Solitude",
    cover:
      "https://s26162.pcdn.co/wp-content/uploads/2018/02/100_Years_First_Ed_Hi_Res-768x1153.jpg",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
  {
    id: 7,
    title: "To kill a Mockingbird",
    cover:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271fced1-654e-4341-8ece-aacafd04eff5/dbms9xp-ce9a87df-a12d-408e-93f5-15a3e236443c.jpg/v1/fill/w_730,h_1095,q_70,strp/to_kill_a_mockingbird_____book_cover_by_darkknight1986_dbms9xp-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUzNiIsInBhdGgiOiJcL2ZcLzI3MWZjZWQxLTY1NGUtNDM0MS04ZWNlLWFhY2FmZDA0ZWZmNVwvZGJtczl4cC1jZTlhODdkZi1hMTJkLTQwOGUtOTNmNS0xNWEzZTIzNjQ0M2MuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Q_SZyZIyDoeNGpvO12wI7ezZE41fYNjY9bv7D7XUHvk",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
  {
    id: 8,
    title: "Neuromancer",
    cover:
      "https://i.etsystatic.com/43710319/r/il/8bd395/6194784821/il_fullxfull.6194784821_2n6f.jpg",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
  {
    id: 9,
    title: "A Brief History of Time",
    cover:
      "https://lh5.googleusercontent.com/proxy/wbFzRuApOR4Oh-O6y8IKYxmRddsZfhuFeiLU_evkyRp54omh-_30-0bV0eDQer6mqNud59AANNuxhCpIEgb7SheOi2LDHHlEaXieicAJKWDEKiiVRw",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
  {
    id: 10,
    title: "The girl with the dragon tattoo",
    cover: "https://sdi4.chrislands.com/sdi/978/03/07/9/9780307949493.jpg",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
  {
    id: 11,
    title: "Pinocchio",
    cover:
      "https://preview.redd.it/how-accurate-was-lies-of-p-to-the-original-the-adventures-v0-7wx4482vuf0d1.jpg?width=640&crop=smart&auto=webp&s=2a4c74264dca60d873cfd865e6951a792a460bec",
    startTime: Date.now() - 9000000, // 2.5 horas de lectura
  },
];

const LiveClock = () => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : initialBooks;
  });

  const [readBooks, setReadBooks] = useState<Book[]>(() => {
    const savedReadBooks = localStorage.getItem("readBooks");
    return savedReadBooks ? JSON.parse(savedReadBooks) : [];
  });

  const [index, setIndex] = useState<number>(0);

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

  const limit = 3;

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex + limit < books.length) {
        return prevIndex + limit;
      }
      return prevIndex;
    });
  };

  const handleBack = () => {
    setIndex((prevIndex) => {
      if (prevIndex - limit >= 0) {
        return prevIndex - limit;
      }
      return 0;
    });
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false); 
      return; 
    }
    if (readBooks.length > 0 && readBooks.length % 3 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
      switch (readBooks.length) {
        case 3:
          toast.success("You've read three books!");
          break;
        case 6:
          toast.success("Wow, you've doubled the books you've read!");
          break;
        case 9:
          toast.success("You're a machine! 9 books read!");
          break;
        default:
          toast.success(`You've read ${readBooks.length} more books!`);
          break;
      }
    }
  }, [readBooks.length]);

  return (
    <>
      <Container>
        <BookListWrapper>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <BookList>
              {books.slice(index, index + limit).map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ maxWidth: "20rem", overflow: "hidden" }}
                >
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
                    style={{
                      fontSize: "1.8rem",
                      margin: "10px 0",
                      color: "#2a2a2a",
                    }}
                  >
                    {book.title}
                  </h3>
                  <p style={{ fontSize: "1.5rem", color: "#555" }}>
                    Time Read:{" "}
                    <span
                      style={{
                        color: "#d77575",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {getTimeElapsed(book.startTime)}
                    </span>
                  </p>
                </motion.div>
              ))}
            </BookList>
          </motion.div>
        </BookListWrapper>
        <DirArrowWrapper>
          <button
            disabled={index === 0}
            className="a-back"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            disabled={index + limit >= books.length}
            className="a-next"
            onClick={handleNext}
          >
            Next
          </button>
        </DirArrowWrapper>

        <DropZoneWrapper>
          <DropZone
            ref={dropZoneRef}
            isHeightToHigh={window.innerWidth}
            onDrop={handleDrop}
            onDragOver={allowDrop}
          >
            <ConfettiComponent isActive={showConfetti} containerRef={dropZoneRef} />
            <div className="user-info">
              <img src={avatar} alt="avatar-icon" className="user-avatar" />
            </div>
            <div className="num-book-read">
              <span>{readBooks.length}</span>
            </div>
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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                style={{
                  color: "#d77575",
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              >
                No tienes libros leídos{" "}
                <FaBookReader
                  style={{
                    fontSize: "2rem",
                    marginLeft: ".5rem",
                    color: "#fff",
                  }}
                />
              </motion.p>
            )}
            <ResetButton onClick={resetBooks}>Reset Books</ResetButton>
          </DropZone>
        </DropZoneWrapper>
      </Container>
    </>
  );
};

export default LiveClock;
