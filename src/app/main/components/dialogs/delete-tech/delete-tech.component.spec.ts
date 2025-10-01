import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTechComponent } from './delete-tech.component';

describe('DeleteTechComponent', () => {
  let component: DeleteTechComponent;
  let fixture: ComponentFixture<DeleteTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
