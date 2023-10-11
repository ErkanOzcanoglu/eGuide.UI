import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketFormComponent } from './socket-form.component';

describe('SocketFormComponent', () => {
  let component: SocketFormComponent;
  let fixture: ComponentFixture<SocketFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocketFormComponent]
    });
    fixture = TestBed.createComponent(SocketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
