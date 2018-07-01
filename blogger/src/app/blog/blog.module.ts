
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogViewComponent } from './blog-view/blog-view.component';



@NgModule({
  declarations: [
    BlogComponent,
    BlogViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule
  ]
})
export class BlogModule {}