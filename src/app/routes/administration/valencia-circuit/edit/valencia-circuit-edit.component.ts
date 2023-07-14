import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { League, RaceFromLeague, RunnerParticipant } from '../../league.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NGXLogger } from 'ngx-logger';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ValenciaCircuitEditRunnerComponent } from '../editRunner/ValenciaCircuitEditRunnerComponent';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface SelectData {
  label: string
  value: string
  data: any
}

export interface ValenciaCircuitEditDialogData{
  league: League,
  races_available: RaceFromLeague[]
  runners_available: RunnerParticipant[]
}

export interface ValenciaCircuitDialogData{
  league: League,
  selected_races: RaceFromLeague[]
  selected_runners: RunnerParticipant[]
}

@Component({
  selector: 'app-valencia-circuit-edit',
  templateUrl: './valencia-circuit-edit.component.html',
  styleUrls: ['./valencia-circuit-edit.component.scss']
})
export class ValenciaCircuitEditComponent implements OnInit {
  form = this.fb.group({});

  private _selectMultipleOptions:SelectData [] = [];

  get selectMultipleOptions(): SelectData[] {
    return this._selectMultipleOptions;
  }
  set selectMultipleOptions(value: SelectData[]) {
    this._selectMultipleOptions = value;
  }

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'league.name',
      type: 'input',
      props: {
        label: 'Nombre',
        required: true
      },
    },
    {
      key: 'key_list_races',
      type: 'select',
      defaultValue: this.model.league.races?.map((item) => item.id??''),
      props: {
        label: 'Lista de carreras',
        multiple: true,
        options: this.model.races_available.map((race) => {
          const item:SelectData = {
            label: race.name,
            value: race.id?? '',
            data: race
          };

          return item;
        }),
        change: (field: FormlyFieldConfig, event?: any) => {
          console.log(field);
          console.log(event);
          const selected_race_ids: string[] = event.value;

          const index = 0;
          this.selectedRace = this.model.races_available
          .filter(race => {
            const id:string = race.id?? '';

            return selected_race_ids.includes(id);
          })
          .map((race) => {
            race.order = index;
            return race;
          });
        }
      },
    },
    {
      key: 'key_list_runners',
      type: 'select',
      defaultValue: this.model.league.runnerParticipants?.map((item) => item.id??''),
      props: {
        label: 'Lista de corredores',
        multiple: true,
        options: this.model.runners_available.
        sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }).
        map((runner) => {
          const item:SelectData = {
            label: runner.name + ' ' + runner.last_name,
            value: runner.id ?? '',
            data: runner
          };

          return item;
        }),
        change: (field: FormlyFieldConfig, event?: any) => {
          console.log(field);
          console.log(event);
          const selected_runners_ids: string[] = event.value;

          const index = 0;
          this.selectedRunners = this.model.runners_available
          .filter(runner => {
            const id:string = runner.id?? '';

            return selected_runners_ids.includes(id);
          })
          .map((runner) => runner);
        }
      },
    }
  ];

  selectedRace:RaceFromLeague[] = [];
  selectedRunners:RunnerParticipant[] = [];

  /* Tabla de lista de corredores */
  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Dorsal',
      field: 'dorsal',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Foto',
      field: 'photo',
      type: 'image',
      width: '80px',
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
          click: record => this.openEditRunnerSelectedModal(record),
        }
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
    private _logger: NGXLogger,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ValenciaCircuitEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: ValenciaCircuitEditDialogData,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    console.log('ValenciaCircuitEditComponent.constructor');
  }

  ngOnInit() {
    console.log('ValenciaCircuitEditComponent.ngOnInit');

    this.selectedRace = this.model.league.races?.map((item) => item) ?? [];
    this.selectedRunners = this.model.league.runnerParticipants?.map((item) => item) ?? [];

    this.form.updateValueAndValidity();
    this.options.updateInitialValue?.caller();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(){
    console.log('ValenciaCircuitEditComponent.submit');

    const data: ValenciaCircuitDialogData = {
      league: this.model.league,
      selected_races: this.selectedRace.map((item, index) =>  {
        item.order = index;

        return item;
      }),
      selected_runners: this.selectedRunners.map((x) => x)
    };

    this.dialogRef.close(data);
  }

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /* Tabla de lista de corredores */

  openEditRunnerSelectedModal(runner: RunnerParticipant){
    console.log('openEditRunnerSelectedModal');

    this.isLoading = true;

    const dialogRef = this.dialog.open(ValenciaCircuitEditRunnerComponent, {
      autoFocus: false,
      disableClose: true,
      data: Object.assign({}, runner)
    });

    dialogRef.afterClosed().subscribe((runner:RunnerParticipant) => {
      this._logger.debug('openEditRunnerSelectedModal.afterAllClosed. runner: ', runner);

      if(runner == undefined) {
        return;
      }

      const selectedRunners_copy = this.selectedRunners.map((x) => x);
      this.selectedRunners = [];

      this.total = this.selectedRunners.length;
      this.isLoading = false;
      this.cdr.detectChanges();

      this.selectedRunners = selectedRunners_copy.map((selected_runner) => {
        if (selected_runner.id == runner.id) {
          selected_runner.dorsal = runner.dorsal;
        }

        return selected_runner;
      });
    });
  }
}
