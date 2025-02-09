import instance from "../api/axiosConfig";
const booksEndpoints = "/books";

export interface Author {
    name: string;
    birth_year: number | null;
    death_year: number | null;
  }
  
  export interface Book {
    id: number;
    title: string;
    authors: Author[];
    summaries: string[];
    translators: string[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: {
      "text/html"?: string;
      "application/epub+zip"?: string;
      "application/x-mobipocket-ebook"?: string;
      "application/rdf+xml"?: string;
      "image/jpeg"?: string; // URL de la portada
      "text/plain; charset=us-ascii"?: string;
      "application/octet-stream"?: string;
    };
    download_count: number;
  }
  
// Get books from the API
export const fetchBooks = async (limit: number = 10): Promise<Book[]> => {
   try {
     const response = await instance.get<{ results: Book[]}>(`${booksEndpoints}/?limit=${limit}&language=en, es`);
     return response.data.results;
   } catch (error) {
        console.error("Error fetching books", error);
        return [];
   }
}

// Get book by id
export const fetchBookId = async (id: number): Promise<Book | null> => {
    try {
       const response = await instance.get<Book>(`${booksEndpoints}/${id}`);
       return response.data;
    } catch(error) {
        console.error(`Error fetching book with ID ${id}`, error);
        return null;
    }
}

// Save books to Dashboard
export const saveBookToDashboard = (book: Book) => {
    const saveBooks = JSON.parse(localStorage.getItem("userBooks") || "[]")

    const bookExists = saveBooks.some((saveBooks: Book) => saveBooks.id === book.id)

    if(bookExists) {
       alert("The book is already saved")
       return 
    }

    localStorage.setItem("userBooks", JSON.stringify([...saveBooks, book]))
    alert("The book is saved correctly")
}