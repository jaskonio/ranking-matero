import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { League, LeagueService } from '../league.service';
import { ValenciaCircuitAddComponent } from './add/valencia-circuit-add.component';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ValenciaCircuitEditComponent } from './edit/valencia-circuit-edit.component';

@Component({
  selector: 'app-valencia-circuit',
  templateUrl: './valencia-circuit.component.html',
  styleUrls: ['./valencia-circuit.component.scss']
})
export class ValenciaCircuitComponent implements OnInit, OnDestroy {
  leagues: League[] = [];

  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'operation',
      field: 'operation',
      minWidth: 160,
      width: '160px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'edit',
          click: record => this.openEditLeagueModal(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: 'delete',
          tooltip: 'delete',
          pop: {
            title: '¿Quieres eliminar la Liga?',
            closeText: 'cerrar',
            okText: 'eliminar',
          },
          click: record => this.removeLeagueModal(record),
        },
      ],
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

  constructor(public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService,
    private _leagueService:LeagueService) {
  }

  ngOnInit() {
    this.getAllLeague();
  }

  private getAllLeague() {
    this.isLoading = true;

    this._leagueService.getAll().subscribe( leagues => {
      this.leagues = leagues;
      this.total = this.leagues.length;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    () => {
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    () => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
  }

  addNewLeague(){
    this.openAddNewLeagueModal();
  }

  openEditLeagueModal(league:League) {
    const dialogRef = this.dialog.open(ValenciaCircuitEditComponent, {
      autoFocus: false,
      disableClose: true,
      data: league
    });

    dialogRef.afterClosed().subscribe((league:League) => {
      console.log('openEditLeagueModal.afterAllClosed');
      console.log(league);

      if(league == undefined) {
        return;
      }

      this._leagueService.update(league).subscribe(data=>{
        this._toast.info('Se ha actualizado la liga');
        this.getAllLeague();
      });
    });
  }

  removeLeagueModal(league:League) {

  }

  private openAddNewLeagueModal(){
    const dialogRef = this.dialog.open(ValenciaCircuitAddComponent, {
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((league:League) => {
      console.log('ValenciaCircuitComponent.openAddNewLeagueModal.afterAllClosed');
      console.log(league);

      if(league == undefined) {
        return;
      }

      this._leagueService.add(league).subscribe((new_league) => {
        console.log(new_league);
        this._toast.info('Se ha creado una nueva Liga');
      },
      () => {
        this._toast.error('Se producido un error al crear una nueva Liga');
      });
    });
  }
}
