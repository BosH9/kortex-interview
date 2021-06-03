import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  Book,
  BooksQuery,
  BooksService,
  BookStore,
} from '@kortext/book-store/state';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kortext-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  title: string = '';
  subtitle: string = '';
  description: string = '';
  thumbnail: string = '';

  book: Book | undefined;

  constructor(
    private _snackBar: MatSnackBar,
    private location: Location,
    private bookService: BooksService,
    private route: ActivatedRoute,
    private bookQuery: BooksQuery
  ) {}

  ngOnInit(): void {
    const activeBookId = this.route.snapshot.paramMap.get('id');

    this.book = this.bookQuery.getEntity(activeBookId);

    console.log(this.book);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1000 });
  }

  goBack() {
    this.location.back();
  }

  addToFavourite() {
    const message = this.book?.title + ' Added to your favourites';
    if (this.book) {
      this.bookService.addFavourite(this.book);
      this.openSnackBar(message, '');
    }
  }

  removeFromFavouties(){
    const message = this.book?.title + ' Removed to your favourites';
    if (this.book) {
      this.bookService.removeFavourite(this.book.id);
      this.openSnackBar(message, '');
    }
  }
}
