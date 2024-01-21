import LiteratureWorldHeader from '../common/header/LiteratureWorldHeader'
import BookSliderCollection from './book-slider-collection/BookSliderCollection'
import './styles.css'

const title = 'Keep the story going...'

const subTitle =
  "Don't let the story end just like so. Continue reading your last book and inmerse yourself in the world of the literature."

const BookSlider = () => {
  return (
    <div className="book-slider-container">
      <div className="book-slider-wrapper">
        <LiteratureWorldHeader
          title={title}
          subTitle={subTitle}
          btnClassName="btn-book-slider"
        />
      </div>
      <BookSliderCollection />
    </div>
  )
}

export default BookSlider
