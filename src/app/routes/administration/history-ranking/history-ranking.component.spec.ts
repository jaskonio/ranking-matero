import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRankingComponent } from './history-ranking.component';

describe('HistoryRankingComponent', () => {
  let component: HistoryRankingComponent;
  let fixture: ComponentFixture<HistoryRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryRankingComponent]
    });
    fixture = TestBed.createComponent(HistoryRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
