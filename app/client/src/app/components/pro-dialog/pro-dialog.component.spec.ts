import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDialogComponent } from './pro-dialog.component';

describe('ProDialogComponent', () => {
  let component: ProDialogComponent;
  let fixture: ComponentFixture<ProDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProDialogComponent]
    });
    fixture = TestBed.createComponent(ProDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
