import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  // @ViewChild('bookForm') bookForm: NgForm;

  constructor(private bookService: BookService) {}

  onAddBook(form: NgForm) {
    if (form.invalid) {
      alert(
        'Veuillez remplir tous les champs du formulaire avant de le soumettre'
      );
    } else {
      const book: Book = {
        id: crypto.randomUUID(),
        title: form.value.title,
        author: form.value.author,
        pageNumber: form.value.pagesNumber,
        editionDate: form.value.editionDate,
        price: form.value.price,
      };

      this.bookService.storeBook(book);
    }
  }
}
