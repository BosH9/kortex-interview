import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Book } from './book.model';

export interface BookState extends EntityState<Book> {
  books: Book[];
  isLoading: boolean;
  query: string;
  favourites: Book[];
}

const initialState = {
  books: [],
  isLoading: false,
  query: '',
  favourites: [],
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'books' })
export class BookStore extends EntityStore<BookState, Book> {
  constructor() {
    super(initialState);
  }

  updateSearchQuery(query: string) {
    this.update({ query });
  }
}

export interface FavBookState extends EntityState<Book> {
  isLoading: boolean;
}

const initialFavState = {
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'favbooks' })
export class FavouriteBookStore extends EntityStore<FavBookState, Book> {
  constructor() {
    super(initialFavState);
  }

  removeFav(id: ID) {
    this.remove(id);
  }
}
