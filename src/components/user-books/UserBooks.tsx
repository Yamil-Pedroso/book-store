import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookId } from "../../services/BooksService";
import { Book } from "../../services/BooksService";
import { highQualityCovers } from "../../data/highQualityCovers";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 30rem;
`;


const UserBooks = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [forceRender, setForceRender] = useState(false); 

  console.log("book", book);

  const getBookCover = (book: Book) => {
    return highQualityCovers[book.id] || book.formats["image/jpeg"];
  };

  useEffect(() => {
    const loadSavedBooks = () => {
      console.log("Checking localStorage for saved books...");
      const storedBooks = localStorage.getItem("userBooks");

      if (storedBooks) {
        try {
          const books: Book[] = JSON.parse(storedBooks);
          console.log("Books found in localStorage:", books);

          if (JSON.stringify(savedBooks) !== JSON.stringify(books)) {
            setSavedBooks(books);
            setForceRender((prev) => !prev); // 🔥 Forzar render
          }
        } catch (error) {
          console.error("Error parsing saved books:", error);
        }
      } else {
        console.log("No books found in localStorage.");
        setSavedBooks([]);
      }
    };

    loadSavedBooks();

    const storageListener = () => {
      loadSavedBooks();
    };

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [forceRender]); // 🔥 Dependencia para forzar la actualización

  useEffect(() => {
    const loadBookById = async () => {
      if (id) {
        const fetchedBook = await fetchBookId(Number(id));
        setBook(fetchedBook);
      }
    };

    loadBookById();
  }, [id]);


  return (
    <Container>
      <div>
        <h2 style={{ color: "#1a1a1a" }}>Saved books</h2>
        {savedBooks.length === 0 ? (
          <p style={{ color: "#1a1a1a" }}>No books saved yet.</p>
        ) : (
          savedBooks.map((savedBook) => (
            <div key={savedBook.id}>
              <div>
                {savedBook.formats["image/jpeg"] && (
                  <img src={getBookCover(savedBook)} alt={savedBook.title} width="200" />
                )}
              </div>
              <p>{savedBook.title}</p>
              <p>Author: {savedBook.authors.map((a) => a.name).join(", ")}</p>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default UserBooks;
