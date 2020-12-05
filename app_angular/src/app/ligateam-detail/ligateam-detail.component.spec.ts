import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigateamDetailComponent } from './ligateam-detail.component';

describe('LigateamDetailComponent', () => {
  let component: LigateamDetailComponent;
  let fixture: ComponentFixture<LigateamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigateamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigateamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
