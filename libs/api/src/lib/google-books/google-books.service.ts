import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book, GoogleBook } from '@kortext/book-store/state';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private API_URL = 'https://www.googleapis.com/books/v1/volumes/?q=';
  private NUMBER_OF_RECORDS = '&maxResults=40';

  constructor(private http: HttpClient) {}

  searchBooks(query: ID) {
    const q = this.API_URL + encodeURIComponent(query) + this.NUMBER_OF_RECORDS;
    return this.http.get<{ items: GoogleBook[] }>(q).pipe(
      map((books) => {
        let data: Book[] = [];

        books.items.map((x) => {
          data.push({
            id: x.id,
            title: x.volumeInfo?.title,
            subtitle: x.volumeInfo.subtitle,
            authors: x.volumeInfo.authors,
            publisher: x.volumeInfo.publisher,
            averageRating: x.volumeInfo.averageRating,
            description: x.volumeInfo.description,
            publishDate: x.volumeInfo.publishDate,
            ratingsCount: x.volumeInfo.ratingsCount,
            isFavourite: false,
            imageLinks: {
              thumbnail: x.volumeInfo.imageLinks?.thumbnail || '/assets/images/not-available.png',
              smallThumbnail: x.volumeInfo.imageLinks?.smallThumbnail
            }
          });
        });

        return data;
      })
    );
  }
}
