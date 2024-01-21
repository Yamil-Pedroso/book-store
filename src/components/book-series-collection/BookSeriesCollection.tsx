import { useState, useEffect } from 'react'
import { bookCollections } from '../../data/bookCollection'
import './styles.css'

interface IBookCollections {
  title: string
  img: string
  totalVol: number
  books: object
}

const BookSeriesCollection = () => {
  const [myBookCollection, setMyBookCollection] = useState<IBookCollections[]>(
    bookCollections,
  )
  console.log(myBookCollection)

  useEffect(() => {
    setMyBookCollection
  }, [myBookCollection])

  return (
    <div className="book-series-coll-container">
      <div className="book-series-coll-wrapper">
        <h4>Book Series Collection</h4>
        <>
          {myBookCollection.map((book: any) => (
            <div key={book.id} className="book-content-coll-wrapper">
              <div className="book-content-coll-left">
                <img src={book.img} alt="book collection img" />
                <div>
                  <p>{book.title}</p>
                  <p>{book.author}</p>
                </div>
              </div>
              <div className="book-content-coll-right">
                <p>{book.totalVol} vol</p>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  )
}

export default BookSeriesCollection
