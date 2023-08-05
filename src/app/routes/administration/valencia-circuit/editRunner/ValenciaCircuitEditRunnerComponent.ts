import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { RunnerFromLeague } from '../../league.service';


@Component({
  selector: 'app-valencia-circuit-edit-runner.component',
  templateUrl: './valencia-circuit-edit-runner.component.html'
})
export class ValenciaCircuitEditRunnerComponent implements OnInit {
  form = this.fb.group({
    dorsal: [this.model.dorsal?? 0, [Validators.required]],
  });

  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'dorsal',
      type: 'input',
      props: {
        label: 'Dorsal',
        type: 'number',
        required: true
      },
    }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ValenciaCircuitEditRunnerComponent>,
    @Inject(MAT_DIALOG_DATA) public model: RunnerFromLeague,
    public dialog: MatDialog
  ) {
    console.log('ValenciaCircuitEditRunnerComponent.constructor');
  }

  ngOnInit() {
    console.log('ValenciaCircuitEditRunnerComponent.ngOnInit');
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(){
    console.log('ValenciaCircuitEditRunnerComponent.submit');
    this.dialogRef.close(this.model);
  }
}
