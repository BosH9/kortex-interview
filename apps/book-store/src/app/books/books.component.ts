import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { BooksService } from '@kortext/book-store/state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kortext-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  booksForm: FormGroup = new FormGroup({
    query: new FormControl(''),
  });
  constructor(
    private router: Router,
    private booksService: BooksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  search() {
    if (this.f.query.value.trim()) {
      this.booksService.resetBooks();
      this.booksService.updateQuery(this.f.query.value);
      this.router.navigate(['/book-store/search']);
    } else {
      this.snackBar.open('Please enter a search keyword', 'close', {
        duration: 2000,
      });
    }
  }

  get f() {
    return this.booksForm.controls;
  }
}
