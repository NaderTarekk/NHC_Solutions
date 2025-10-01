import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateServiceComponent } from '../dialogs/create-service/create-service.component';
import { MainService } from '../../services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteServiceComponent } from '../dialogs/delete-service/delete-service.component';
import { UpdateServiceComponent } from '../dialogs/update-service/update-service.component';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  services: any[] = []
  token: any
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 4;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.GetAllServices()

    this.token = localStorage.getItem("token");
  }

  openServiceDialog(): void {
    const dialogRef = this.dialog.open(CreateServiceComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllServices()
      }
    });
  }

  openUpdateServiceDialog(service: any): void {
    const dialogRef = this.dialog.open(UpdateServiceComponent, {
      data: { service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllServices()
      }
    });
  }

  openDeleteServiceDialog(service: any): void {
    const dialogRef = this.dialog.open(DeleteServiceComponent, {
      data: { service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllServices()
      }
    });
  }

  GetAllServices() {
    this.service.ServicesList(this.currentPage, this.pageSize).subscribe((res: any) => {
      this.services = res.items
      this.totalItems = res.totalCount;
    })
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.GetAllServices();
  }
}
