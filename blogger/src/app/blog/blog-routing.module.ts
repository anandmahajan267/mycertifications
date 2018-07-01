
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { BlogComponent } from './blog.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

const blogRoutes: Routes = [
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'blog/:id', component: BlogViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(blogRoutes)
  ],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
