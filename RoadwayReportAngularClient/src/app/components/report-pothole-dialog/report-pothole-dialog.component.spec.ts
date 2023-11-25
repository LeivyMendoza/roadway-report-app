import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPotholeDialogComponent } from './report-pothole-dialog.component';

describe('ReportPotholeDialogComponent', () => {
  let component: ReportPotholeDialogComponent;
  let fixture: ComponentFixture<ReportPotholeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPotholeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPotholeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
