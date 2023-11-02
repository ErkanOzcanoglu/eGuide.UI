import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorModalComponent } from './connector-modal.component';

describe('ConnectorModalComponent', () => {
  let component: ConnectorModalComponent;
  let fixture: ComponentFixture<ConnectorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorModalComponent]
    });
    fixture = TestBed.createComponent(ConnectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
