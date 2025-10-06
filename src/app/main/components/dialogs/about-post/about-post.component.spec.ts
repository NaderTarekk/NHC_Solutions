import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPostComponent } from './about-post.component';

describe('AboutPostComponent', () => {
  let component: AboutPostComponent;
  let fixture: ComponentFixture<AboutPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
