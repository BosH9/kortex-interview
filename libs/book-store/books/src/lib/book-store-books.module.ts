import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@kortext/material';

import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'details/:id', pathMatch: 'full', component: DetailsComponent},
      {path: 'search', pathMatch: 'full', component: SearchComponent},
    ]),
  ],
  declarations: [
    SearchComponent,
    DetailsComponent
  ],
})
export class BookStoreBooksModule {}
