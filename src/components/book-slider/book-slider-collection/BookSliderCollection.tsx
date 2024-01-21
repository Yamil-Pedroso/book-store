import { useState, useEffect } from 'react'
import { bookSliderData } from '../../../data/bookSlider'
import UserProfilAccount from '../../common/user-profil-account/UserProfilAccount'
import Marquee from 'react-marquee-slider'
import './styles.css'

interface IBookSliderData {
  id: number
  title: string
  desc: string
  img: string
  author: string
  authorAvatar: string
}

const BookSliderCollection = () => {
  const [bookSliderCollData, setBookSliderCollData] = useState<
    IBookSliderData[]
  >(bookSliderData)
  const [textActive, setTextActive] = useState(false)
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null)
  const bookIndex0 = bookSliderData[0]

  console.log(bookIndex0)

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

  const marqueeProps = {
    velocity: hoveredBookIndex ? 0 : 25,
    direction: 'ltr' as const,
    scatterRandomly: false,
    resetAfterTries: 100,
    onInit: () => {
      console.log('Marquee initialized')
    },
    onFinish: () => {
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
            Got chance to read out the <a href="#"> new collection </a> of Harry
            Potter? It's a must-read for any fan of the series, don't miss it!
            :)
          </p>
        </div>
        <div className="books-counter">
          <p>{bookSliderCollData.length} books</p>
        </div>
      </div>
    </div>
  )
}

export default BookSliderCollection
