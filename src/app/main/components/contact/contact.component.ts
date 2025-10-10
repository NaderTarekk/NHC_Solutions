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
  form!: FormGroup;
  email: string = 'khaled.ahmedsabry@yahoo.com nadertarek781@gmail.com';

  constructor(private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.service.SendEmail(this.form.value).subscribe(res => {
      this.toastr.success("Thank you for contacting us. We will contact you soon.", "Sent Successfully");
      this.form.reset();
    }, err => {
      this.toastr.error(err.error.message, "Send a message");
    })
  }
}
