import { Injectable } from '@angular/core';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { GoogleBooksService } from '@kortext/api';
import { Book, GoogleBook } from './book.model';
import { BookStore, BookState, FavBookState, FavouriteBookStore } from './book.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy: 'author' })
export class BooksQuery extends QueryEntity<BookState, Book> {
  constructor(protected store: BookStore) {
    super(store);
  }

  getBooks(term: string, sortBy: keyof Book) {
    return this.selectAll({
      sortBy,
      filterBy: (entity) => this.filter(entity, term),
    });
  }

  filter(ent: Book, term: string) {
    return ent.authors?.join(',')?.toLowerCase()?.includes(term);
  }

  get getQuery() {
    return this.store.getValue().query;
  }

  get getFavourites() {
    return this.select((x) => x.favourites);
  }
}

@Injectable({ providedIn: 'root' })
export class FavBooksQuery extends QueryEntity<FavBookState, Book> {
  constructor(protected store: FavouriteBookStore) {
    super(store);
  }

  get getFavourites() {
    return this.selectAll();
  }
}
