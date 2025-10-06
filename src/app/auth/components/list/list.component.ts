import { Component, createComponent, inject, model, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  users: any[] = [];
  pageNumber = 1;
  token!: any;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("NHCToken");
    this.GetAllUsers();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllUsers()
      }
    });
  }

  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllUsers()
      }
    });
  }

  openResetPasswordDialog(user: any) {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { user }
    });
  }

  openUpdateUserDialog(user: any) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllUsers()
      }
    });
  }

  GetAllUsers() {
    this.service.UsersList(this.pageNumber, this.token).subscribe((res: any) => {
      this.users = res.items;
    })
  }

}
