import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValenciaCircuitComponent } from './valencia-circuit.component';

describe('ValenciaCircuitComponent', () => {
  let component: ValenciaCircuitComponent;
  let fixture: ComponentFixture<ValenciaCircuitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValenciaCircuitComponent]
    });
    fixture = TestBed.createComponent(ValenciaCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
