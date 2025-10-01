import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { SharedModule } from "../shared/shared.module"; 
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    LoginComponent,
    ListComponent,
    CreateUserComponent,
    DeleteUserComponent,
    ChangePasswordComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    MatRadioModule
]
})
export class AuthModule { }
