import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@kortext/material';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookStoreStateModule } from '@kortext/book-store/state';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'book-store',
    loadChildren: () =>
      import('@kortext/book-store/books').then((m) => m.BookStoreBooksModule),
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('@kortext/book-store/bookmarks').then(
        (m) => m.BookStoreBookmarksModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent, BooksComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    BookStoreStateModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
