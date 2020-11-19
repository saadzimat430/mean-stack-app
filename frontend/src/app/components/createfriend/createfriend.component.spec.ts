import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefriendComponent } from './createfriend.component';

describe('CreatefriendComponent', () => {
  let component: CreatefriendComponent;
  let fixture: ComponentFixture<CreatefriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatefriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
