import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { League, LeagueService } from '../administration/league.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LeagueService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  leagues: League[] = [];
  columns: MtxGridColumn[] = [
    {
      header: 'Foto',
      field: 'photo',
      type: 'image',
      width: '50px',
    },
    {
      header: 'Nombre',
      field: 'name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'dorsal',
      field: 'dorsal',
      sortable: true,
      width: '50px',
    },
    {
      header: 'puntos',
      field: 'puntos',
      sortable: true,
      width: '50px',
    },
    {
      header: 'T Real',
      field: 'realTime',
      sortable: true,
      width: '50px',
    },
    {
      header: 'T Pos',
      field: 'realPos',
      sortable: true,
      width: '50px',
    },
    {
      header: 'T R Medio',
      field: 'realAverageTime',
      sortable: true,
      width: '50px',
    },
  ];

  isLoading = false;
  total = 0;

  multiSelectable = false;
  rowSelectable = false;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = true;
  rowStriped = true;
  showPaginator = true;
  columnResizable = false;

  constructor(
    private _leagueService:LeagueService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this._leagueService.getAll().subscribe( data => {
      this.leagues = data;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
  }
}
