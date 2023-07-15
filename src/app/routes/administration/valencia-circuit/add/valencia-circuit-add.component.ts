import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { League } from '../../league.service';


@Component({
  selector: 'app-valencia-circuit-add',
  templateUrl: './valencia-circuit-add.component.html'
})
export class ValenciaCircuitAddComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    final_ranking: [[]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ValenciaCircuitAddComponent>,
    public dialog: MatDialog
  ) {
    console.log('ValenciaCircuitAddComponent.constructor');
  }

  ngOnInit() {
    console.log('ValenciaCircuitAddComponent.ngOnInit');
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(){
    console.log('ValenciaCircuitAddComponent.submit');
    this.dialogRef.close(this.form.value);
  }
}
