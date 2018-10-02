import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookToReviewPage } from './book-to-review';

@NgModule({
  declarations: [
    BookToReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(BookToReviewPage),
  ],
})
export class BookToReviewPageModule {}
