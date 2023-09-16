import { Subscription, map } from 'rxjs';
import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css'],
})
export class FavoriteBooksComponent {
  favoriteBooks: Book[] = [];
  favoriteBooksSubscription: Subscription;

  constructor(private booksService: BookService) {}

  ngOnInit(): void {
    this.favoriteBooks = this.booksService.getFavoriteBooks();
    this.favoriteBooksSubscription =
      this.booksService.favoriteBooksChanged.subscribe((favoriteBooks) => {
        this.favoriteBooks = favoriteBooks;
      });
  }

  removeFromFavorites(bookId: string) {
    this.booksService.removeFav(bookId);
  }

  ngOnDestroy(): void {
    this.favoriteBooksSubscription.unsubscribe();
  }
}
