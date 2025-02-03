import { useState, useEffect } from 'react'
import axiosInstance from '../api/FetchData'

interface Book {
  volumeInfo: {
    title: string
    authors: string[]
    imageLinks: {
      thumbnail: string
    }
    description: string
  }
}

const GoogleBookData = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const API_KEY = 'AIzaSyBeI0tdPITZfdFuZyWHYzskRyds3NrTP88'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/volumes?q=${search}&key=${API_KEY}`,
        )
        setBooks(response.data.items)
      } catch (error) {
        console.error('Error al obtener los libros:', error)
      }
    }

    // Solo realizar la búsqueda si hay un término de búsqueda
    if (search.trim() !== '') {
      fetchData()
    } else {
      // Limpiar resultados si no hay término de búsqueda
      setBooks([])
    }
  }, [search])

  return (
    <div style={{ marginLeft: '10rem' }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          onChange={handleChange}
          value={search}
          placeholder="Search for books"
        />
        <button type="submit">Search</button>
      </form>
      <h2 style={{ color: '#2a2a2a' }}>Books</h2>
      <ul style={{ color: '#2a2a2a' }}>
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.volumeInfo.title}</h3>
            <p>Authors: {book.volumeInfo.authors?.join(', ')}</p>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
            />
            <p>{book.volumeInfo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GoogleBookData
