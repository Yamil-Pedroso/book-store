import { useState, useEffect } from 'react'
import { bookSliderData } from '../../../data/bookSlider'
import UserProfilAccount from '../../common/user-profil-account/UserProfilAccount'
import Marquee from 'react-marquee-slider'
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
  const [hover, setHover] = useState(false)
  const [bookSliderCollData, setBookSliderCollData] = useState<
    IBookSliderData[]
  >(bookSliderData)
  const [textActive, setTextActive] = useState(false)
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null)
  const [stopFirstBookMovement, setStopFirstBookMovement] = useState(false)

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
                  src={bookSliderCollData[0].authorAvatar}
                  alt="book-slider-img"
                  width="100"
                />
              </div>
              <div className="author-name-wrapper">
                <p className="author-name">{bookSliderCollData[0].author}</p>
                <p>Author</p>
              </div>
            </div>
            <div className="desc-book-wrapper">
              <p className="author-name">{bookSliderCollData[0].desc}</p>
            </div>
          </div>
        ) : (
          textActive &&
          hoveredBookIndex !== null && (
            <div className="author-book">
              <div className="author-book-img">
                <div className="img-wrapper">
                  <img
                    src={bookSliderCollData[hoveredBookIndex].authorAvatar}
                    alt="book-slider-img"
                    width="100"
                  />
                </div>
                <div className="author-name-wrapper">
                  <p className="author-name">
                    {bookSliderCollData[hoveredBookIndex].author}
                  </p>
                  <p>Author</p>
                </div>
              </div>
              <div className="desc-book-wrapper">
                <p className="author-name">
                  {bookSliderCollData[hoveredBookIndex].desc}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="book-slider-coll-wrapper">
        <Marquee {...marqueeProps}>
          {bookSliderCollData.map((book: any, idx: number) => (
            <div key={book.id} className="book-slider">
              <div
                onMouseEnter={() => handleMouseOver(idx)}
                onMouseLeave={handleMouseLeave}
                className="book-slider-content"
              >
                <img src={book.img} alt="book-slider-img" />
                <div className="book-title-wrapper">
                  <p className="book-title active">{book.title}</p>
                  <p className="book-desc">{book.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
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
             exit={ { opacity: 0, x: -50 } }
             transition={{ duration: 0.5, ease: "easeInOut" }}
             style={{ 
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "200px",
              color: "#1a1a1a", 
              padding: "1rem", 
              background: "#fff", 
              boxShadow: "3px 3px 30px 1px rgba(56, 87, 138, 0.3)", 
              visibility: hover ? "visible" : "hidden",
              position: "absolute",
              right: "-2.5rem",
              top: "4.5rem"
            }}>

            <img src="https://media.takealot.com/covers_tsins/35774288/35774288-1VOC-zoom.jpg" alt="harry-potter"
              style={{ width: "80px", height: "80px"}}
             />
            <p
              style={{ 
                marginLeft: ".3rem",
                fontSize: "0.8rem",
                textAlign: "center",
                fontWeight: "bold",
                color: "#f27373"
      
              }}
            >Harry Potter collection</p>
          </motion.div>
        </div>
        <div className="books-counter">
          <p>{bookSliderCollData.length} books</p>
        </div>
      </div>
    </div>
  )
}

export default BookSliderCollection
