import { useState } from "react";

// Define a type for book data
interface Book {
  id: number;
  title: string;
  cover: string;
  startTime: number; // Timestamp of when the book started being read
}

const books: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    cover:
      "https://i.pinimg.com/originals/07/7e/22/077e221ae4eb2b8975a6619d009eef14.jpg",
    startTime: Date.now() - 3600000, // Simulating 1 hour of reading
  },
  {
    id: 2,
    title: "1984",
    cover:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png",
    startTime: Date.now() - 5400000, // Simulating 1.5 hours of reading
  },
  {
    id: 3,
    title: "Dune",
    cover:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe78bf586-4ce5-471a-af75-bdeb6f7757f2_1200x1850.jpeg",
    startTime: Date.now() - 7200000, // Simulating 2 hours of reading
  },
];

const LiveClock = () => {
  // Calculate time read for each book only once
  const getTimeElapsed = (startTime: number) => {
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        textAlign: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {books.map((book) => (
        <div key={book.id} style={{ maxWidth: "20rem", overflow: "hidden" }}>
          <img
            src={book.cover}
            alt={book.title}
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          />
          <h3 style={{ fontSize: "2rem", margin: "10px 0", color: "#2a2a2a" }}>
            {book.title}
          </h3>
          <p style={{ fontSize: "1.5rem", color: "#555" }}>
            Time Read:{" "}
            <span style={{ color: "#333", fontWeight: "bold", fontSize: "1.5rem" }}>
              {getTimeElapsed(book.startTime)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default LiveClock;
