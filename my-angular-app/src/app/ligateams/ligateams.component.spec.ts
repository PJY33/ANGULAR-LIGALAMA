import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigateamsComponent } from './ligateams.component';

describe('LigateamsComponent', () => {
  let component: LigateamsComponent;
  let fixture: ComponentFixture<LigateamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigateamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigateamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
