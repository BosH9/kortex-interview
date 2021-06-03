import { Component, OnInit } from '@angular/core';
import {Book, BooksService, FavBooksQuery} from '@kortext/book-store/state'
import { Observable } from 'rxjs';

@Component({
  selector: 'kortext-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  books$: Observable<Book[]> = new Observable<Book[]>();
  loading$: Observable<boolean> = new Observable<boolean>();
  constructor(private bookService: BooksService, private bookQuery: FavBooksQuery) { }

  ngOnInit(): void {
    this.loading$ = this.bookQuery.selectLoading();
    this.books$ = this.bookQuery.getFavourites;
  }

  
  trackByBook(event:any){
    return event?.id;
  }

  removeFromFavourite(book:Book){
    this.bookService.removeFavourite(book.id);
  }

}
