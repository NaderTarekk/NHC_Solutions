import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from '../../services/main.service';
import { CreateTeamMemberComponent } from '../dialogs/create-team-member/create-team-member.component';
import { UpdateTeamMemberComponent } from '../dialogs/update-team-member/update-team-member.component';
import { DeleteTeamMemberComponent } from '../dialogs/delete-team-member/delete-team-member.component';

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  members: any[] = []
  token: any
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 999;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.GetAllTeamMembers()

    this.token = localStorage.getItem("NHCToken");
  }

  openCreateTeamMemberDialog(): void {
    const dialogRef = this.dialog.open(CreateTeamMemberComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTeamMembers()
      }
    });
  }

  openUpdateTeamMemberDialog(member: any): void {
    const dialogRef = this.dialog.open(UpdateTeamMemberComponent, {
      data: { member }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTeamMembers()
      }
    });
  }

  openDeleteTeamMemberDialog(member: any): void {
    const dialogRef = this.dialog.open(DeleteTeamMemberComponent, {
      data: { member }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTeamMembers()
      }
    });
  }

  GetAllTeamMembers() {
    this.service.TeamList(this.currentPage, this.pageSize).subscribe((res: any) => {
      this.members = res.items;
      this.totalItems = res.totalCount;
    })
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.GetAllTeamMembers();
  }
}
