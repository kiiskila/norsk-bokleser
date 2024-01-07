/**
 * Interface representing the structure of a book in the system.
 */
export interface book {
  id: number; // Unique identifier for the book
  slug: string; // URL-friendly identifier for the book
  title: string; // Title of the book
  author: string[]; // Array of authors of the book
  isbn?: string; // Optional ISBN number of the book
  cover_art?: string; // Optional URL of the book's cover art
  published_date?: Date; // Optional publication date of the book
  summary_english: string; // Summary of the book in English
  summary_norwegian: string; // Summary of the book in Norwegian
  created_at: Date; // Date when the book record was created
  updated_at: Date; // Date when the book record was last updated
}

/**
 * Interface representing the structure of a chapter associated with a book.
 */
export interface chapter {
  id: number; // Unique identifier for the chapter
  book_id: number; // Identifier of the book this chapter belongs to
  number: number; // Chapter number
  title?: string; // Optional title of the chapter
  body?: string; // Optional body text of the chapter
  created_at: Date; // Date when the chapter record was created
  updated_at: Date; // Date when the chapter record was last updated
}

/**
 * These interfaces are critical for type safety and ensure consistency
 * across the application. They define the data structures for books and
 * chapters, which are used in various components and API interactions.
 * Optional fields allow flexibility in data representation.
 */
