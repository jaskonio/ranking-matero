import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { League } from '../../league.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';


@Component({
  selector: 'app-valencia-circuit-edit',
  templateUrl: './valencia-circuit-edit.component.html'
})
export class ValenciaCircuitEditComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'NombreTerminado',
        required: true
      },
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<ValenciaCircuitEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: League,
    public dialog: MatDialog
  ) {
    console.log('ValenciaCircuitEditComponent.constructor');
    console.log(this.data);
  }

  ngOnInit() {
    console.log('ValenciaCircuitEditComponent.ngOnInit');
    console.log(this.data);
    this.model = this.data;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(){
    console.log('ValenciaCircuitEditComponent.submit');
    this.dialogRef.close(this.data);
  }
}
