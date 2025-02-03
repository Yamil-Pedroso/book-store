import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

export const fetchBooksData = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/books/v1/volumes", {
                    params: {
                        key: process.env.GOOGLE_BOOK_STORE_API_KEY,
                        // Aquí puedes agregar otros parámetros de consulta si los necesitas
                    }
                });
                console.log('response', response.data);
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    console.log('books', books);
    return { books, loading };
};
