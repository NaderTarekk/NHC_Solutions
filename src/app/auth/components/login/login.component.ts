import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loader: boolean = false;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  OnLogin() {
    this.loader = true;
    this.service.Login(this.form.value).subscribe((res: any) => {
      this.toastr.success("Sign in successfully", "Sign In");
      localStorage.setItem("NHCToken", res.token);
      this.router.navigate([""]);

    }, error => {
      this.toastr.error(error.error.message, "Sign In");
      this.loader = false;
    })
  }

}
