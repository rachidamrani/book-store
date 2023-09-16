import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';

import { findBookIndex } from './shared/utils';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [];
  favoriteBooks: Book[] = [];
  booksChanged = new Subject<Book[]>();
  favoriteBooksChanged = new Subject<Book[]>();

  getBooks(): Book[] {
    return [...this.books];
  }

  getFavoriteBooks(): Book[] {
    return [...this.favoriteBooks];
  }

  storeBook(book: Book) {
    const { title, author } = book;

    const bookFound = this.books.find(
      (book) => book.title === title && book.author === author
    );

    if (!bookFound) {
      this.books.push(book);
      this.booksChanged.next([...this.books]);
    } else {
      alert('Ce livre existe déja dans le store!');
    }
  }

  deleteBook(bookId: string): void {
    const bookIndex = findBookIndex(this.books, bookId);
    this.books.splice(bookIndex, 1);
    this.booksChanged.next([...this.books]);
  }

  addFav(bookId: string) {
    const bookIndex = findBookIndex(this.books, bookId);
    if (this.favoriteBooks.indexOf(this.books[bookIndex]) === -1) {
      this.favoriteBooks.push(this.books[bookIndex]);
      this.favoriteBooksChanged.next([...this.favoriteBooks]);
    } else {
      alert('Ce livre existe déja dans votre liste favoris');
    }
  }

  removeFav(bookId: string) {
    const bookIndex = findBookIndex(this.favoriteBooks, bookId);
    this.favoriteBooks.splice(bookIndex, 1);
    this.favoriteBooksChanged.next([...this.favoriteBooks]);
  }

  getBookById(bookId: string): Book | undefined {
    return this.books.find((book) => book.id === bookId);
  }
}
