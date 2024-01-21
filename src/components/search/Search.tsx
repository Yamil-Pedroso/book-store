import './styles.css'
import { IoMdSearch } from 'react-icons/io'

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <IoMdSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search book name, author, edition..."
          className="search-input"
        />
      </div>
    </div>
  )
}

export default Search
