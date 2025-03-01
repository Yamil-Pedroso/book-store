import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
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
  Header,
  BookContentWrapper,
  ReaderWrapper,
  TimeReading,
  ReadingProcess,
  AIRecommendationWrapper,
  AIRecommendationBox,
  IconWrapper,
} from "./styles";
import { IoMdTime } from "react-icons/io";
import { motion } from "framer-motion";
import Loading from "../common/loading/Loading";
import AIRecommendation from "../common/ai-recommendation/AIRecommendation";
import { FaBookBookmark } from "react-icons/fa6";
import { FaCopy, FaFileDownload, FaShareAlt  } from "react-icons/fa";
import { RiUserVoiceFill } from "react-icons/ri";

const WORDS_PER_PAGE = 250;
const INACTIVITY_TIME = 60;

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [bookText, setBookText] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [hover, setHover] = useState(false);
  const [showBorderDynamic, setShowBorderDynamic] = useState(false);
  const [zoomWindow, setZoomWindow] = useState(false);

  const bookContentRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    setHover(!hover);
  };

  const handleLeave = () => {
    setHover(false);
  };

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
          setIsPaused(true);
          console.log("⏸ Paused for inactivity.");
        } else {
          setReadingTime((prevTime) => prevTime + 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, lastActivity]);

  useEffect(() => {
    const resetTimer = () => {
      setLastActivity(Date.now());
      if (isPaused) {
        setIsPaused(false);
        console.log("▶ Resumed by user activity.");
      }
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

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

  useEffect(() => {
    setTimeout(() => {
      const bookContentElement = bookContentRef.current;
      if (bookContentElement) {
        bookContentElement.scrollTo(0, 0);
      }
    }, 100);
  }, [currentPage]);

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

  const handleSaveTimeReading = () => {
    console.log("⏳ Read's time saved:", formatTime(readingTime));
    alert("⏳ Read's time saved: " + formatTime(readingTime));
  };

  if (!book) return <Loading />;

  return (
    <ReaderContainer>
      <ReaderWrapper>
        <div style={{ width: "800px" }}>
          <BookContent ref={bookContentRef}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {pages.length > 0 ? (
                pages[currentPage]
              ) : (
                <Loading
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </motion.div>
          </BookContent>
        </div>

        <div style={{ marginLeft: "2rem" }}>
          <BookContentWrapper>
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
          </BookContentWrapper>
          <Header>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>
              by {book.authors.map((author) => author.name).join(", ")}
            </BookAuthor>

            <ReadingTimer>
              <TimeReading>
                <IoMdTime
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                  onClick={handleSaveTimeReading}
                  style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                    position: "relative",
                  }}
                />{" "}
                <p>Time Reading: {formatTime(readingTime)}</p>
              </TimeReading>

              <ReadingProcess>
                <Link to="/live-clock">
                  <p>Reading process</p>
                </Link>
              </ReadingProcess>
            </ReadingTimer>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: "10rem",
                right: "50rem",
                fontWeight: "bold",
                padding: ".5rem 1rem",
                borderRadius: "3rem",
                background: "#a8a8a8",
                color: "#181818",
                opacity: hover ? 1 : 0,
                zIndex: 1,
              }}
            >
              Save time reading
            </motion.div>

            <TimerControls>
              <PageButton onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </PageButton>
            </TimerControls>
          </Header>

          <AIRecommendationWrapper
            zoomWindow={zoomWindow}
            showBorderDynamic={showBorderDynamic}
          >
            <AIRecommendationBox>
              <AIRecommendation
                showBorderDynamic={showBorderDynamic}
                setShowBorderDynamic={setShowBorderDynamic}
                zoomWindow={zoomWindow}
                setZoomWindow={setZoomWindow}
              />
            </AIRecommendationBox>

            {
              showBorderDynamic && (
                <IconWrapper>
              <FaBookBookmark className="icon"/>
              <FaCopy className="icon"/>
              <FaFileDownload className="icon"/>
              <FaShareAlt className="icon"/>
              <RiUserVoiceFill className="icon"/>
            </IconWrapper>
              )
            }
          </AIRecommendationWrapper>
        </div>
      </ReaderWrapper>
    </ReaderContainer>
  );
};

export default Reader;
