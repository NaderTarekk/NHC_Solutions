import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechComponent } from './create-tech.component';

describe('CreateTechComponent', () => {
  let component: CreateTechComponent;
  let fixture: ComponentFixture<CreateTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
