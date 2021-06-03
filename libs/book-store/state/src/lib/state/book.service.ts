import { BookStore, FavBookState, FavouriteBookStore } from './book.store';
import { GoogleBooksService } from '@kortext/api';
import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { ID } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(
    private googleService: GoogleBooksService,
    private bookStore: BookStore,
    private favBookStore: FavouriteBookStore
  ) {}

  searchBooks(query: string) {
    this.bookStore.setLoading(true);
    this.googleService.searchBooks(query).subscribe((books) => {
      this.bookStore.set(books);
      this.bookStore.setLoading(false);
    });
  }

  updateQuery(query: string) {
    this.bookStore.updateSearchQuery(query);
  }

  resetBooks() {
    this.bookStore.set([]);
  }

  addFavourite(book: Book) {
    this.bookStore.update(book.id,{authors:book.authors, averageRating: book.averageRating, description: book.description,imageLinks:book.imageLinks, isFavourite: true, publishDate: book.publishDate, publisher: book.publishDate, ratingsCount: book.ratingsCount, title: book.title, subtitle: book.subtitle})
    this.favBookStore.add(book);
  }

  removeFavourite(id: ID) {
    this.favBookStore.removeFav(id);
  }
}
