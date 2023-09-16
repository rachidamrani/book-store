import { Book } from '../book.model';

export function findBookIndex(booksArray: Book[], bookId: string) {
  return booksArray.findIndex((book) => book.id === bookId);
}
