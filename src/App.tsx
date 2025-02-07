import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Aside from './components/word-place/aside/Aside'
import Search from './components/search/Search'
import HomePage from './pages/HomePage'
import BookSliderPage from './pages/BookSliderPage'
import ReadingBookPage from './pages/ReadingBookPage'
import LiveClockPage from './pages/LiveClockPage'
import BookMarkPage from './pages/BookMarkPage'
import {  Toaster } from 'sonner'

function App() {
  return (
    <div>
      <Aside />
      <Search />
      <Toaster 
        position="top-right"
      />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-slider" element={<BookSliderPage />} />
          <Route path="/reading-books" element={<ReadingBookPage />} />
          <Route path="/live-clock" element={<LiveClockPage />} />
          <Route path="/book-mark" element={<BookMarkPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
