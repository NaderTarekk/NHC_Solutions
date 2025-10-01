import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'NHCPortfolio';
  token: any = ""
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
}
