import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTestimonialComponent } from './delete-testimonial.component';

describe('DeleteTestimonialComponent', () => {
  let component: DeleteTestimonialComponent;
  let fixture: ComponentFixture<DeleteTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
