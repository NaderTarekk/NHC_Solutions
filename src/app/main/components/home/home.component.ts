import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  token: string | null = null;
  email: string = "khaled.ahmedsabry@yahoo.com";
  ipAddress!: string;
  visitors: any[] = []
  projects: any[] = []
  pageNumber: number = 1;
  projectPageNumber: number = 1;
  projectPageSize: number = 4;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("NHCToken")

    this.service.getIpAddress().subscribe((response: any) => {
      this.ipAddress = response.ip;

      this.service.PostNewVisitor({ ipAddress: this.ipAddress, userAgent: "win11" }).subscribe(res => {

        this.service.GetAllVisitors(this.pageNumber, this.token).subscribe((res: any) => {
          this.visitors = res
        })
      })
    });

    this.GetAllProjects();
  }

  GetAllProjects() {
    this.service.projectList(this.projectPageNumber, this.projectPageSize).subscribe((res: any) => {
      this.projects = res;
    })
  }
  
}
