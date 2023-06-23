import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasquestsComponent } from './basquests.component';

describe('BasquestsComponent', () => {
  let component: BasquestsComponent;
  let fixture: ComponentFixture<BasquestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasquestsComponent]
    });
    fixture = TestBed.createComponent(BasquestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
