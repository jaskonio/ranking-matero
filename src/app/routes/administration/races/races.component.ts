import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Race, RaceService } from '../race.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RaceEditComponent } from './edit/race.component';
import { RaceAddComponent } from './add/race-add.component';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit, OnDestroy {
  races:Race[] = [];

  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Procesado',
      field: 'processed',
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
          click: record => this.editRace(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: 'delete',
          tooltip: 'delete',
          pop: {
            title: '¿Quieres eliminar al participante?',
            closeText: 'cerrar',
            okText: 'eliminar',
          },
          click: record => this.removeRace(record),
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
    private _raceService:RaceService,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService) {
  }

  ngOnInit() {
    this.getAllRace();
  }

  ngOnDestroy() {
  }

  addNewRace() {
    this.openAddNewRaceModal();
  }

  editRace(race:Race) {
    this.openEditRaceMode(race);
  }

  removeRace(race:Race) {
    console.log('removeRace');
  }

  getAllRace() {
    this.isLoading = true;

    this._raceService.getAll().subscribe( data => {
      console.log('Get All Races');
      console.log(data);

      this.races = data;
      this.total = this.races.length;
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

  openAddNewRaceModal(){
    const dialogRef = this.dialog.open(RaceAddComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((race:Race) => {
      console.log('openAddNewRaceModal.afterAllClosed');
      console.log(race);

      if(race == undefined) {
        return;
      }

      this._raceService.add(race).subscribe(data => {
        console.log(data);
        this._toast.info('La carrera se ha añadido correctamente');
        this.getAllRace();
      },(error) => {
        console.log(error);
        this._toast.error('La carrera no se ha añadido correctamente');
      });
    });
  }

  openEditRaceMode(race: Race) {
    console.log('openEditRaceMode');
    console.log(race);

    const dialogRef = this.dialog.open(RaceEditComponent, {
      autoFocus: false,
      disableClose: true,
      data: race,
      width: '100%',
      panelClass: 'dialog-responsive'
    });

    dialogRef.afterClosed().subscribe((race:Race) => {
      console.log('openEditRaceMode.afterClosed');

      if(race == undefined) {
        return;
      }

      this._raceService.update(race).subscribe(data =>{
        console.log(data);
        this._toast.info('La carrera se actualizado correctamente');
        this.getAllRace();
      },(error) => {
        console.log(error);
        this._toast.error('La carrera no se ha actualizado');
      });
    });
  }
}
