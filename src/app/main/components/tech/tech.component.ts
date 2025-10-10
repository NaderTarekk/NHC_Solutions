import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CreateTechComponent } from '../dialogs/create-tech/create-tech.component';
import { DeleteTechComponent } from '../dialogs/delete-tech/delete-tech.component';
import { MainService } from '../../services/main.service';
import { UpdateTechComponent } from '../dialogs/update-tech/update-tech.component';

@Component({
  selector: 'app-tech',
  standalone: false,
  templateUrl: './tech.component.html',
  styleUrl: './tech.component.scss'
})
export class TechComponent {
  readonly dialog = inject(MatDialog);
  Techs: any[] = []
  token: any
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 4;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.GetAllTechs()

    this.token = localStorage.getItem("NHCToken");
  }

  openCreateTechDialog(): void {
    const dialogRef = this.dialog.open(CreateTechComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTechs()
      }
    });
  }

  openUpdateTechDialog(tech: any): void {
    const dialogRef = this.dialog.open(UpdateTechComponent, {
      data: { tech }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTechs()
      }
    });
  }

  openDeleteTechDialog(tech: any): void {
    const dialogRef = this.dialog.open(DeleteTechComponent, {
      data: { tech }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTechs()
      }
    });
  }

  GetAllTechs() {
    this.service.TechList(this.currentPage, this.pageSize).subscribe((res: any) => {
      this.Techs = res.items;
      this.totalItems = res.totalCount;
    })
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.GetAllTechs();
  }
}
