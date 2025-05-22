import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReportDialogComponent } from './assign-report-dialog.component';

describe('AssignReportDialogComponent', () => {
  let component: AssignReportDialogComponent;
  let fixture: ComponentFixture<AssignReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
