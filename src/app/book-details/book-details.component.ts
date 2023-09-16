import { BookService } from './../book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  book: Book;
  bookIsFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    const book = this.bookService.getBookById(this.bookId);
    const booksIsFavorite = this.bookService
      .getFavoriteBooks()
      .find((book) => book.id === this.bookId);

    if (booksIsFavorite) {
      this.bookIsFavorite = true;
    }

    if (book) {
      this.book = book;
    } else {
      this.router.navigate(['not-found']);
    }
  }
}
