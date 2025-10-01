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
import { ReactiveFormsModule } from '@angular/forms';
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
    ScrollingModule
  ]
})
export class MainModule { }
