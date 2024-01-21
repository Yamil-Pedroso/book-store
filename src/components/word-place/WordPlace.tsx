import LeftSideClassicBooks from './left-side/LeftSideClassicBooks'
import RightSide from './right-side/RightSide'
import './styles.css'

const WordPlace = () => {
  return (
    <div className="word-place-container">
      <LeftSideClassicBooks />
      <RightSide />
    </div>
  )
}

export default WordPlace
