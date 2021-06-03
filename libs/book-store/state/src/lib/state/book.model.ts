import { ID } from '@datorama/akita';

export type Book = {
  id: ID;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishDate: string;
  description: string;
  averageRating: number;
  ratingsCount: number;
  isFavourite: boolean;
  imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
};

export type GoogleBook = {
  id: ID;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    isFavourite: boolean;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
};
