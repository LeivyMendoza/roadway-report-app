import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUpdateDialogComponent } from './status-update-dialog.component';

describe('StatusUpdateDialogComponent', () => {
  let component: StatusUpdateDialogComponent;
  let fixture: ComponentFixture<StatusUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
