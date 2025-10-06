import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from '../../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTestimonialComponent } from '../dialogs/create-testimonial/create-testimonial.component';
import { UpdateTestimonialComponent } from '../dialogs/update-testimonial/update-testimonial.component';
import { DeleteTestimonialComponent } from '../dialogs/delete-testimonial/delete-testimonial.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-testimonial',
  standalone: false,
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  testimonials: any[] = []
  token: any
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 9999999;
  showApproval: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetAllTestimonials()

    this.token = localStorage.getItem("NHCToken");
  }

  openCreateTestimonialDialog(): void {
    const dialogRef = this.dialog.open(CreateTestimonialComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTestimonials()
      }
    });
  }

  openUpdateTestimonialDialog(test: any): void {
    const dialogRef = this.dialog.open(UpdateTestimonialComponent, {
      data: { test }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTestimonials()
      }
    });
  }

  openDeleteTestimonialDialog(test: any): void {
    const dialogRef = this.dialog.open(DeleteTestimonialComponent, {
      data: { test }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllTestimonials()
      }
    });
  }

  GetAllTestimonials() {
    this.service.TestimonialList(this.currentPage, 10).subscribe((res: any) => {
      this.testimonials = res.items
      this.totalItems = res.totalCount;
    })
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.GetAllTestimonials();
  }

  showApprovedTestimonials(event: Event) {
    const input = event.target as HTMLInputElement;
    this.showApproval = input.checked;
    
    this.service.GetApprovedTestimonials(this.currentPage, this.pageSize, this.showApproval).subscribe((res: any) => {
      this.testimonials = res.items
    })
  }

  onToggleApproval(test: any, event: any) {
    const newValue = event.target.checked;
    test.isApproved = newValue;
    this.token = localStorage.getItem("NHCToken");

    this.service.UpdateTestimonial(test.testimonialId, newValue, this.token).subscribe((res: any) => {
      if (newValue == true)
        this.toastr.success("Testimonial is approved", "Approving Testimonial")
      else
        this.toastr.success("Testimonial is not approved", "Approving Testimonial")
    }, err => {
      this.toastr.success(err.error.message, "Approving Testimonial")
    })
  }

  trackById(index: number, item: any) {
    return item.id;
  }

}
