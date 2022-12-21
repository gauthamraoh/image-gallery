import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToProfileComponent } from './add-to-profile.component';

describe('AddToProfileComponent', () => {
  let component: AddToProfileComponent;
  let fixture: ComponentFixture<AddToProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
