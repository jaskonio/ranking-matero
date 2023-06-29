import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Runner } from '../../race.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-runner-edit',
  templateUrl: './runner-edit.component.html'
})
export class RunnerEditComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'finished',
      type: 'checkbox',
      props: {
        label: 'Ha Terminado',
        required: true
      },
    },
    {
      key: 'officialTime',
      type: 'input',
      props: {
        label: 'Tiempo oficial',
        required: true
      }
    },
    {
      key: 'officialPos',
      type: 'input',
      props: {
        label: 'Posicion oficial',
        type: 'number',
        required: true
      }
    },
    {
      key: 'officialAverageTime',
      type: 'input',
      props: {
        label: 'Ritmo Oficial',
        required: true
      }
    },
    {
      key: 'officialCatPos',
      type: 'input',
      props: {
        label: 'Pos. Catergoria oficial',
        type: 'number',
        required: true
      }
    },
    {
      key: 'officialGenPos',
      type: 'input',
      props: {
        label: 'Pos. genero oficial',
        type: 'number',
        required: true
      }
    },
    {
      key: 'realTime',
      type: 'input',
      props: {
        label: 'Tiempo real',
        required: true
      }
    },
    {
      key: 'realPos',
      type: 'input',
      props: {
        label: 'Posicion real',
        type: 'number',
        required: true
      }
    },
    {
      key: 'realAverageTime',
      type: 'input',
      props: {
        label: 'Ritmo tiempo real',
        required: true
      }
    },
    {
      key: 'realCatPos',
      type: 'input',
      props: {
        label: 'Pos. categoria real',
        type: 'number',
        required: true
      }
    },
    {
      key: 'realGenPos',
      type: 'input',
      props: {
        label: 'Pos genero real',
        type: 'number',
        required: true
      }
    },
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Nombre',
        required: true
      }
    },
    {
      key: 'dorsal',
      type: 'input',
      props: {
        label: 'Dorsal',
        type: 'number',
        required: true
      }
    },
    {
      key: 'gender',
      type: 'input',
      props: {
        label: 'Genero',
        required: true
      }
    },
    {
      key: 'category',
      type: 'input',
      props: {
        label: 'Caterogia',
        required: true
      }
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<RunnerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Runner
  ) {
    console.log('RunnerEditComponent.constructor');
    console.log(this.data);
  }

  ngOnInit() {
    console.log('RunnerEditComponent.ngOnInit');
    console.log(this.data);
    this.model = this.data;

  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.model);
    }
  }
}
