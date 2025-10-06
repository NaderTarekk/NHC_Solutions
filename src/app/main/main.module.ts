import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { ContactComponent } from './components/contact/contact.component';
import { TechComponent } from './components/tech/tech.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { CreateServiceComponent } from './components/dialogs/create-service/create-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { DeleteServiceComponent } from './components/dialogs/delete-service/delete-service.component';
import { UpdateServiceComponent } from './components/dialogs/update-service/update-service.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CreateTechComponent } from './components/dialogs/create-tech/create-tech.component';
import { DeleteTechComponent } from './components/dialogs/delete-tech/delete-tech.component';
import { UpdateTechComponent } from './components/dialogs/update-tech/update-tech.component';
import { CreateTestimonialComponent } from './components/dialogs/create-testimonial/create-testimonial.component';
import { UpdateTestimonialComponent } from './components/dialogs/update-testimonial/update-testimonial.component';
import { DeleteTestimonialComponent } from './components/dialogs/delete-testimonial/delete-testimonial.component';
import { CreateProjectComponent } from './components/dialogs/create-project/create-project.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostComponent } from './components/dialogs/create-post/create-post.component';
import { UpdatePostComponent } from './components/dialogs/update-post/update-post.component';
import { DeletePostComponent } from './components/dialogs/delete-post/delete-post.component';
import { AboutPostComponent } from './components/dialogs/about-post/about-post.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    HomeComponent,
    ServicesComponent,
    ProjectsComponent,
    TeamComponent,
    TestimonialComponent,
    ContactComponent,
    TechComponent,
    HeaderComponent,
    AboutComponent,
    CreateServiceComponent,
    DeleteServiceComponent,
    UpdateServiceComponent,
    CreateTechComponent,
    DeleteTechComponent,
    UpdateTechComponent,
    CreateTestimonialComponent,
    UpdateTestimonialComponent,
    DeleteTestimonialComponent,
    CreateProjectComponent,
    BlogsComponent,
    CreatePostComponent,
    UpdatePostComponent,
    DeletePostComponent,
    AboutPostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    ToastrModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    ScrollingModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,    // Importing MatPaginatorModule
    MatSelectModule,       // Importing MatSelectModule
    MatInputModule,        // Importing MatInputModule
    MatSortModule,         // Importing MatSortModule
    MatCardModule,
    MatTableModule
  ]
})
export class MainModule { }
