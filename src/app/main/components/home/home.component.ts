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
  ipAddress!: string;
  visitors: any[] = []
  pageNumber: number = 1;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")

    this.service.getIpAddress().subscribe((response: any) => {
      this.ipAddress = response.ip;

      this.service.PostNewVisitor({ ipAddress: this.ipAddress, userAgent: "win11" }).subscribe(res => {
        const token = localStorage.getItem("token");
        
        this.service.GetAllVisitors(this.pageNumber, token).subscribe((res: any) => {
          this.visitors = res
        })
      })
    });


  }

}
