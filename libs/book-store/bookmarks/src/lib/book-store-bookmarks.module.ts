import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@kortext/material';
import { FavouritesComponent } from './favourites/favourites.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FavouritesComponent },
    ]),
  ],
  declarations: [FavouritesComponent],
})
export class BookStoreBookmarksModule {}
