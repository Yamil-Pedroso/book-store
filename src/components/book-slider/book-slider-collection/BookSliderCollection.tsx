import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { bookSliderData } from '../../../data/bookSlider'
import UserProfilAccount from '../../common/user-profil-account/UserProfilAccount'
import Marquee from 'react-marquee-slider'
import { Book } from "../../,,/../../services/BooksService";
import { highQualityCovers } from "../../../data/highQualityCovers";
import './styles.css'
import { motion } from 'framer-motion'
interface IBookSliderData {
  id: number
  title: string
  desc: string
  img: string
  author: string
  authorAvatar: string
}

const BookSliderCollection = () => {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const [bookSliderCollData, setBookSliderCollData] = useState<
    IBookSliderData[]
  >(bookSliderData)
  const [textActive, setTextActive] = useState(false)
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null)
  const [stopFirstBookMovement, setStopFirstBookMovement] = useState(false)
  const [insertedBox, setInsertedBox] = useState<null[]>([])

  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [forceRender, setForceRender] = useState(false);

  const handleBookClick = (bookId: number) => {
    navigate(`/book-reader/${bookId}`);
  };

  const getBookCover = (book: Book) => {
    return highQualityCovers[book.id] || book.formats["image/jpeg"];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadSavedBooks = () => {
      console.log("Checking localStorage for saved books...");
      const storedBooks = localStorage.getItem("userBooks");

      if (storedBooks) {
        try {
          const books: Book[] = JSON.parse(storedBooks);
          console.log("Books found in localStorage:", books);

          if (JSON.stringify(savedBooks) !== JSON.stringify(books)) {
            setSavedBooks(books);
            setForceRender((prev) => !prev);
          }
        } catch (error) {
          console.error("Error parsing saved books:", error);
        }
      } else {
        console.log("No books found in localStorage.");
        setSavedBooks([]);
      }
    };

    loadSavedBooks();

    const storageListener = () => {
      loadSavedBooks();
    };

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [forceRender]); // 🔥 Dependencia para forzar la actualización

  const handleNewColHover = () => {
    setHover(true)
  }

  const handleNewColLeave = () => {
    setHover(false)
  }

  const handleMouseOver = (index: number) => {
    setHoveredBookIndex(index)
    setTextActive(true)
  }

  const handleMouseLeave = () => {
    setHoveredBookIndex(null)
    setTextActive(false)
  }

  useEffect(() => {
    setBookSliderCollData
  }, [bookSliderCollData])

  useEffect(() => {
    if (hoveredBookIndex !== null && hoveredBookIndex !== 0) {
      setTextActive(true)
    } else {
      setTextActive(false)
    }

    if (hoveredBookIndex === 0) {
      setStopFirstBookMovement(true)
    } else {
      setStopFirstBookMovement(false)
    }
  }, [hoveredBookIndex])

  const marqueeProps = {
    velocity: stopFirstBookMovement || hoveredBookIndex ? 0 : 25,
    direction: 'ltr' as const,
    scatterRandomly: false,
    resetAfterTries: 100,
    onInit: () => {
      console.log('Marquee initialized')
    },
    onFinish: () => {
      setHoveredBookIndex(null)
      setTextActive(false)
      console.log('Marquee finished')
    },
  }



  const handleInsertBox = () => {
    setInsertedBox((prev) => [...prev, null])
  }

  const handleDelBox = () => {
    setInsertedBox(prev => prev.slice(0, -1))
  }

  const sliderWidth = `${savedBooks.length * 600}px`;

  return (
    <div className="book-slider-coll-container">
      <div className="profil-account-wrapper">
        <UserProfilAccount name="Yami Carfolear" classColorName="color-name" />
      </div>
      <div className="right-box">UserProfilAccount</div>
      <div className="author-book-wrapper">
        {!textActive ? (
          <div className="author-book">
            <div className="author-book-img">
              <div className="img-wrapper">
                <img
                  src={""}
                  alt="book-slider-img"
                  width="100"
                />
              </div>
              <div className="author-name-wrapper">
                <p className="author-name">Hola</p>
                <p>Author</p>
              </div>
            </div>
            <div className="desc-book-wrapper">
              <p className="author-name">Hola</p>
            </div>
          </div>
        ) : (
          textActive &&
          hoveredBookIndex !== null && (
            <div className="author-book">
              <div className="author-book-img">
                <div className="img-wrapper">

                  <img
                    src={getBookCover(savedBooks[hoveredBookIndex])}
                    alt="book-slider-img"
                    width="100"
                  />
                </div>
                <div className="author-name-wrapper">
                  <p className="author-name">
                    {savedBooks[hoveredBookIndex].authors.map((author) => author.name).join(", ")}
                  </p>
                  <p>Author</p>
                </div>
              </div>
              <div className="desc-book-wrapper">
                <p className="author-name">
                  {savedBooks[hoveredBookIndex].subjects}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="book-slider-coll-wrapper" style={{ width: sliderWidth }}>
      {savedBooks.length === 0 ? (
          <p style={{ color: "#1a1a1a" }}>No books saved yet.</p>
        ) : (
        <Marquee {...marqueeProps}>
          {savedBooks.map((book: any, idx: number) => (
            <div key={book.id}
              className="book-slider"
              onClick={() => handleBookClick(book.id)}
              >
              <div
                onMouseEnter={() => handleMouseOver(idx)}
                onMouseLeave={handleMouseLeave}
                className="book-slider-content"
              >
                <div className='img-content'>
                  {book.formats["image/jpeg"] && (
                    <img src={getBookCover(book)} alt={book.title} />
                  )}
                </div>
                <div className="book-title-wrapper">
                  <p className="book-title active">{book.title}</p>
                  <p className="book-desc">{book.subjects}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
        )}
      </div>
      <div className="counter-books-new-coll-wrapper">
        <div className="new-coll-wrapper">
          <p>
            Got chance to read out the <a href="#"
              onMouseEnter={handleNewColHover}
              onMouseLeave={handleNewColLeave}
            > new collection </a> of Harry
            Potter? It's a must-read for any fan of the series, don't miss it!
            :)
          </p>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : -50 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "200px",
              color: "#1a1a1a",
              padding: "1rem",
              background: "#252526",
              boxShadow: "3px 3px 30px 1px rgba(56, 87, 138, 0.3)",
              visibility: hover ? "visible" : "hidden",
              position: "absolute",
              right: "-2.5rem",
              top: "4.5rem"
            }}>

            <img src="https://media.takealot.com/covers_tsins/35774288/35774288-1VOC-zoom.jpg" alt="harry-potter"
              style={{ width: "80px", height: "80px" }}
            />
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: ".3rem",
                fontSize: "0.8rem",
                textAlign: "center",
                fontWeight: "bold",
                color: "#cbc9c9"

              }}
            ><span
              style={{
                color: "#f27373",
                fontSize: "1rem",
                fontWeight: "bold",
                marginRight: ".3rem"
              }}
            >NEW!</span>Harry Potter collection!</p>
          </motion.div>
        </div>
        <div className="books-counter">
          <p>{savedBooks.length} books</p>
        </div>
      </div>
    </div>
  )
}

export default BookSliderCollection
