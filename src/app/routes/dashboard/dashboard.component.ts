import {
  Component,
  OnInit,
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
      header: 'Pos',
      field: 'position',
      sortable: true,
      width: '20px',
    },
    {
      header: 'Nombre',
      field: 'name',
      sortable: true,
      width: '100px',
    },
    {
      header: 'puntos',
      field: 'points',
      sortable: true,
      width: '50px',
    },
    {
      header: 'Pos ultima carrera',
      field: 'pos_last_race',
      sortable: true,
      width: '50px',
    },
    {
      header: 'Top Five',
      field: 'top_five',
      sortable: true,
      width: '50px',
    },
    {
      header: 'Carreras',
      field: 'participations',
      sortable: true,
      width: '50px',
    },
    {
      header: 'Mejor puesto',
      field: 'best_position',
      sortable: true,
      width: '50px',
    },
    {
      header: 'Puesto ultima carrera',
      field: 'last_position_race',
      sortable: true,
      width: '50px',
    },
    {
      header: 'Mejor Media ',
      field: 'best_avegare_peace',
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
