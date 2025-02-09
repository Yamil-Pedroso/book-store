import { useState, useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton"; // 🔹 Importamos Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // 🔹 Estilos para los placeholders
import "./styles.css";
import { books } from "../../data/books";
import LiteratureWorldHeader from "../common/header/LiteratureWorldHeader";
import { IoMdCloudDownload } from "react-icons/io";
import { highQualityCovers } from "../../data/highQualityCovers";

// Books from the API
import { fetchBooks } from "../../services/BooksService";
import { Book } from "../../services/BooksService";

interface BookProps {
  title: string;
  author: string;
  qt: number;
  active: boolean;
}

const title = "Happy reading, Yami";

const subTitle =
  "Wow, you have chosen a book of magic, spells and incantations full of adventures! Harry Potter, The Boy Who Survived. We wish you a pleasant read and a pleasant reading and that you immerse yourself in these pages of ancient wizards and unforgettable characters!";

const ClassicBooks = () => {
  const [myBooks, setMyBooks] = useState<BookProps[]>(books);
  const [apiBooks, setApiBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBookCover = (book: Book) => {
    return highQualityCovers[book.id] || book.formats["image/jpeg"];
  };

  const hiddenBookId = 26184;


  useEffect(() => {
    setMyBooks;
  }, [myBooks]);

  // Fetch books from the API
  useEffect(() => {
    const number = 5;
    const loadBooksApi = async () => {
      const books = await fetchBooks(number);
      setApiBooks(books);
      setLoading(false);
    };

    loadBooksApi();
  }, []);

  // 🔹 Filtrar libros en inglés y español usando useMemo para evitar recálculos innecesarios
  const filteredBooks = useMemo(() => {
    return apiBooks.filter(
      (book) => book.languages.includes("en") || book.languages.includes("es")
    );
  }, [apiBooks]);

  return (
    <div className="classic-book-container">
      <LiteratureWorldHeader
        title={title}
        subTitle={subTitle}
        btnClassName="btn-classic-books"
      />

      <div className="api-books-container">
        <h2>Books Store</h2>
        {loading ? (
          <div className="api-books-grid">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="api-book-card skeleton">
                <div className="book-img-wrapper">
                  <Skeleton
                    height={200}
                    width="100%"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                    enableAnimation={true}
                  />
                </div>
                <h3>
                  <Skeleton
                    width="80%"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                    enableAnimation={true}
                  />
                </h3>
                <p className="author">
                  <Skeleton
                    width="60%"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                    enableAnimation={true}
                  />
                </p>
                <div className="downloads-wrapper">
                  <Skeleton
                    width="40%"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                    enableAnimation={true}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="api-books-grid">
            {filteredBooks.map((book) => (
              book.id === hiddenBookId ? null : (
                <div key={book.id} className="api-book-card">
                  <div className="book-img-wrapper">
                    {book.formats["image/jpeg"] && (
                      <img src={getBookCover(book)} alt={book.title} />
                    )}
                  </div>
                  <h3>{book.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <p className="author">
                      {book.authors.map((author) => author.name).join(", ")}
                    </p>
                    {/*} <span style={{ color: "red" }}> {book.id} </span>*/}

                    <div className="downloads-wrapper">
                      <IoMdCloudDownload className="download-icon"
                      />
                      <p className="downloads">{book.download_count} downloads</p>
                    </div>

                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicBooks;
