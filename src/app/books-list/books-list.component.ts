import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  booksSubscription: Subscription;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.books = this.bookService.getBooks();
    this.booksSubscription = this.bookService.booksChanged.subscribe(
      (books) => {
        this.books = books;
      }
    );
  }

  onDeleteBook(bookId: string) {
    this.bookService.deleteBook(bookId);
  }

  onAddToFavorite(bookId: string) {
    this.bookService.addFav(bookId);
  }

  getBookDetails(bookId: string) {
    this.router.navigate(['/book-details', bookId]);
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
