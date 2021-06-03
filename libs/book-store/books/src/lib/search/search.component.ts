import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Book, BooksQuery, BooksService } from '@kortext/book-store/state';
import { Observable } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'kortext-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  loading: boolean = false;
  searchQuery: string = '';
  books: Book[] = [];
  loading$: Observable<boolean> = new Observable<boolean>();
  booksForm: FormGroup = new FormGroup({
    query: new FormControl(''),
    sortBy: new FormControl(''),
  });

  constructor(
    private router: Router,
    private bookQuery: BooksQuery,
    private bookService: BooksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading$ = this.bookQuery.selectLoading();
    this.f.query.setValue(this.bookQuery.getQuery);

    this.search();

    // this.bookQuery
    //   .getBooks(this.bookQuery.getQuery, this.f.sortBy.value)
    //   .subscribe((res) => {
    //     this.books = res;
    //     this.loading$ = this.bookQuery.selectLoading();
    //   });

    this.f.sortBy.valueChanges
      .pipe(
        startWith('author'),
        switchMap((sortBy) => {
          return this.bookQuery.selectAll({ sortBy: sortBy });
        })
      )
      .subscribe((res) => (this.books = res));
  }

  get f() {
    return this.booksForm?.controls;
  }

  search() {
    const searchQuery = this.f?.query.value;
    if(searchQuery)
    this.bookService.searchBooks(searchQuery);
    else {
      this.snackBar.open('Please enter a search keyword', 'close', {
        duration: 2000,
      });
    }
  }

  clearValues() {
    this.f?.query.setValue('');
  }

  gotoHome() {
    this.clearValues();
    this.router.navigate(['books']);
  }

  trackByBook(event: any) {
    return event?.id;
  }
}
