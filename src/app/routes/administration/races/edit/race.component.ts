import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Race, Runner } from '../../race.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { RunnerEditComponent } from '../../runner/edit/runner-edit.component';

@Component({
  selector: 'app-race-edit',
  templateUrl: './race.component.html'
})
export class RaceEditComponent implements OnInit {

  raceForm = this.fb.group({
    name: [this.data.name, [Validators.required]],
    url: [this.data.url, [Validators.required]],
    is_sorted: [!this.data.is_sorted],
  });

  // table
  ranking:Runner[] = [];

  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'name',
      sortable: true
    },
    {
      header: 'Dorsal',
      field: 'dorsal',
      sortable: true,
    },
    {
      header: 'T. Oficial',
      field: 'officialTime',
      sortable: true
    },
    {
      header: 'Pos. Oficial',
      field: 'officialPos',
      sortable: true
    },
    {
      header: 'Ritmo Oficial',
      field: 'officialAverageTime',
      sortable: true
    },
    {
      header: 'Cat. Pos. Oficial',
      field: 'officialCatPos',
      sortable: true
    },
    {
      header: 'Gen. Pos. Oficial',
      field: 'officialGenPos',
      sortable: true
    },
    {
      header: 'T. Real',
      field: 'realTime',
      sortable: true
    },
    {
      header: 'Pos. Real',
      field: 'realPos',
      sortable: true
    },
    {
      header: 'Ritmo Real',
      field: 'realAverageTime',
      sortable: true
    },
    {
      header: 'Cat. Pos. Real',
      field: 'realCatPos',
      sortable: true
    },
    {
      header: 'Gen. Pos. Real',
      field: 'realGenPos',
      sortable: true
    },
    {
      header: 'operation',
      field: 'operation',
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'edit',
          click: record => this.editDialogRunner(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: 'delete',
          tooltip: 'delete',
          pop: {
            title: '¿Quieres eliminar al corredor?',
            closeText: 'cerrar',
            okText: 'eliminar',
          },
          click: record => this.removeRunner(record),
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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RaceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Race,
    public dialog: MatDialog
  ) {
    console.log('RaceEditComponent.constructor');
    console.log(this.data);
  }

  ngOnInit() {
    console.log('RaceEditComponent.ngOnInit');
    console.log(this.data);

    if(this.data.ranking != undefined) {
      this.ranking = this.data.ranking;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(){
    console.log('RaceEditComponent.submit');
    console.log(this.raceForm.value);

    this.data.name = this.raceForm.value.name == undefined? '': this.raceForm.value.name
    this.data.is_sorted = !this.raceForm.value.is_sorted == null? undefined: !this.raceForm.value.is_sorted

    this.dialogRef.close(this.data);
  }

  editDialogRunner(runner: Runner): void {
    console.log('RaceEditComponent.editDialogRunner');
    console.log(runner);

    const dialogRef = this.dialog.open(RunnerEditComponent, {
      autoFocus: false,
      disableClose: true,
      data: runner
    });

    dialogRef.afterClosed().subscribe((runner:Runner) => {
      console.log('RaceEditComponent.editDialogRunnerafterClosed');
      console.log(runner);
      this.tableDetectChanges();
    });
  }

  removeRunner(runner: Runner): void {
    console.log('RaceEditComponent.removeRunner');
    console.log(runner);
  }

  private tableDetectChanges(){
    this.total = this.ranking.length;
  }
}
