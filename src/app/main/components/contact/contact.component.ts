import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form!: FormGroup
  email: string = 'nadertarek781@gmail.com'

  constructor(private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })
  }


  onSubmit(): void {
    this.service.SendMessage(this.form.value).subscribe(res => {
      this.toastr.success("Created Successfully", "Send a message")
    }, err => {
      this.toastr.error(err.error.message, "Send a message")
    })
  }
}
