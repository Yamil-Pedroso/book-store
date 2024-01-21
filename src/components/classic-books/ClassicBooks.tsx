import { useState, useEffect } from 'react'
import './styles.css'
import { books } from '../../data/books'
import BookSeriesCollection from '../book-series-collection/BookSeriesCollection'
import LiteratureWorldHeader from '../common/header/LiteratureWorldHeader'

interface BookProps {
  title: string
  author: string
  qt: number
  active: boolean
}

const title = 'Happy reading, Yami'

const subTitle =
  'Wow, you have chosen a book of magic, spells and incantations full of adventures! Harry Potter, The Boy Who Survived. We wish you a pleasant read and a pleasant reading and that you immerse yourself in these pages of ancient wizards and and unforgettable characters!'

const ClassicBooks = () => {
  const [myBooks, setMyBooks] = useState<BookProps[]>(books)
  console.log(myBooks)

  useEffect(() => {
    setMyBooks
  }, [myBooks])

  const color = {
    yellowC: '#f7d020',
    greenC: '#61b272',
  }

  return (
    <div className="classic-book-container">
      <LiteratureWorldHeader
        title={title}
        subTitle={subTitle}
        btnClassName="btn-classic-books"
      />
      <div className="book-content-wrapper">
        <p>Books to read</p>
        <div className="card-content">
          {myBooks.slice(0, 8).map((book: any, idx: any) => (
            <div
              key={book.id}
              className="literature-wrapper"
              style={{
                background: idx % 2 === 0 ? color.yellowC : color.greenC,
              }}
            >
              <div className="card-wrapper">
                <img src={book.img} alt="image" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookSeriesCollection />
    </div>
  )
}

export default ClassicBooks
