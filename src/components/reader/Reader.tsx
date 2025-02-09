import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchBookId } from "../../services/BooksService";
import { Book } from "../../services/BooksService";
import {
  ReaderContainer,
  BookTitle,
  BookAuthor,
  BookContent,
  PaginationWrapper,
  PageButton,
  ReadingTimer,
  TimerControls,
} from "./styles";
import { motion } from "framer-motion";

const WORDS_PER_PAGE = 250;
const INACTIVITY_TIME = 60; // ⏳ Segundos antes de pausar automáticamente

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [bookText, setBookText] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const bookContentRef = useRef<HTMLDivElement>(null); // 🔥 Referencia al área de lectura

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;
      const bookData = await fetchBookId(Number(id));
      if (bookData) {
        setBook(bookData);
        loadBookContent(bookData);
      }
    };

    const loadBookContent = async (book: Book) => {
      const gutenbergId = book.id;
      const textUrl = `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`;

      try {
        const response = await fetch(textUrl);
        if (!response.ok) throw new Error("Failed to fetch book content");

        const text = await response.text();
        if (text.includes("<html") || text.includes("<head>")) {
          throw new Error("The book content is not available");
        }

        setBookText(text);
        paginateText(text);
      } catch (error) {
        console.error("Error loading book content:", error);
        setBookText(
          "⚠ The book content could not be loaded. Try another book."
        );
      }
    };

    loadBook();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isPaused) {
      interval = setInterval(() => {
        if (Date.now() - lastActivity > INACTIVITY_TIME * 1000) {
          setIsPaused(true); // 🔥 Pausar automáticamente si no hay actividad
          console.log("⏸ Pausado por inactividad.");
        } else {
          setReadingTime((prevTime) => prevTime + 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, lastActivity]);

  // 🔥 Detectar actividad (movimiento del mouse, teclas o scroll en la zona de lectura)
  useEffect(() => {
    const resetTimer = () => {
      setLastActivity(Date.now());
      if (isPaused) {
        setIsPaused(false);
        console.log("▶ Reanudado por actividad.");
      }
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // 🔥 Detectar scroll en el área de lectura
    const bookContentElement = bookContentRef.current;
    if (bookContentElement) {
      bookContentElement.addEventListener("scroll", resetTimer);
    }

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (bookContentElement) {
        bookContentElement.removeEventListener("scroll", resetTimer);
      }
    };
  }, [isPaused]);

  const paginateText = (text: string) => {
    const words = text.split(" ");
    const totalPages = Math.ceil(words.length / WORDS_PER_PAGE);
    const paginatedText = Array.from({ length: totalPages }, (_, i) =>
      words.slice(i * WORDS_PER_PAGE, (i + 1) * WORDS_PER_PAGE).join(" ")
    );
    setPages(paginatedText);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!book) return <p>Loading book...</p>;

  return (
    <ReaderContainer>
      <BookTitle>{book.title}</BookTitle>
      <BookAuthor>
        by {book.authors.map((author) => author.name).join(", ")}
      </BookAuthor>

      <ReadingTimer>⏳ Time Reading: {formatTime(readingTime)}</ReadingTimer>

      <TimerControls>
        <PageButton onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "▶ Resume" : "⏸ Pause"}
        </PageButton>
      </TimerControls>

      <BookContent ref={bookContentRef}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {pages.length > 0 ? pages[currentPage] : "Loading book content..."}
        </motion.div>
      </BookContent>

      <PaginationWrapper>
        <PageButton onClick={prevPage} disabled={currentPage === 0}>
          ⬅ Previous
        </PageButton>
        <span>
          Page {currentPage + 1} of {pages.length}
        </span>
        <PageButton
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
        >
          Next ➡
        </PageButton>
      </PaginationWrapper>
    </ReaderContainer>
  );
};

export default Reader;
