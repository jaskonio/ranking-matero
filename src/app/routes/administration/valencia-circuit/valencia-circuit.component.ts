import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { League, LeagueService, RaceFromLeague, RunnerParticipant } from '../league.service';
import { ValenciaCircuitAddComponent } from './add/valencia-circuit-add.component';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ValenciaCircuitDialogData, ValenciaCircuitEditComponent, ValenciaCircuitEditDialogData } from './edit/valencia-circuit-edit.component';
import { NGXLogger } from 'ngx-logger';
import { Race, RaceService } from '../race.service';
import { forkJoin, race } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Participant, PersonService } from '../person.service';
import { json } from 'stream/consumers';

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

  all_races:Race[] = [];

  all_runners:Participant[] = [];

  constructor(private _logger: NGXLogger,
    private _raceService: RaceService,
    private _runnersService: PersonService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService,
    private _leagueService:LeagueService,
    private _spinner: NgxSpinnerService,
    private snackBarService: MatSnackBar) {
      this._logger.debug('ValenciaCircuitComponent.constructor');
  }

  ngOnInit() {
    this._spinner.show();
    // this.getAllLeague();
    this.isLoading = true;
    forkJoin([this._leagueService.getAll(), this._raceService.getAll(),
      this._runnersService.getAll()])
    .subscribe( responseList => {
      const leagues = responseList[0];
      const races = responseList[1];
      const runners = responseList[2];

      this.leagues = leagues;
      this.total = this.leagues.length;
      this.isLoading = false;
      this.cdr.detectChanges();

      this.all_races = races;
      this.all_runners = runners;

      this._spinner.hide();
    });
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
    const modal_data: ValenciaCircuitEditDialogData = {
      league,
      races_available: this.all_races.map(item => {
        const race:RaceFromLeague = {
          id: item.id,
          name:item.name,
          order:0,
          url:item.url,
          ranking: item.ranking
        };
        return race;
      }),
      runners_available: this.all_runners.map((runner) => {
        const item:RunnerParticipant = {
          first_name: runner.first_name,
          last_name: runner.last_name,
          nationality: '',
          gender: '',
          photo: '',
          photo_url: runner.photo_url,  
          dorsal: 0,
        };

        return item;
      })
    };

    const dialogRef = this.dialog.open(ValenciaCircuitEditComponent, {
      autoFocus: false,
      disableClose: true,
      data: modal_data
    });

    dialogRef.afterClosed().subscribe((data:ValenciaCircuitDialogData) => {
      this._logger.debug('openEditLeagueModal.afterAllClosed. dataModal: ', data);

      if(data == undefined) {
        return;
      }

      const current_league = data.league;
      const current_selected_races = data.selected_races;
      const current_selected_runners = data.selected_runners;

      current_league.races = current_selected_races;
      current_league.runners = current_selected_runners;

      this._leagueService.update(current_league).subscribe(data=>{
        this._toast.info('Se ha actualizado la liga');
        this.getAllLeague();
      });
    });
  }

  removeLeagueModal(league:League) {
    if (league.id == undefined) {
      console.log('League no contain id');
      return;
    }

    this._leagueService.delete(league.id).subscribe( data => {
      this._toast.info('Se ha eliminado la liga');
      this.getAllLeague();
    });
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
