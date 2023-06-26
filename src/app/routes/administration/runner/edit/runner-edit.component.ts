import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Participant } from '../../person.service';
import { Race, Runner } from '../../race.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-runner-edit',
  templateUrl: './runner-edit.component.html'
})
export class RunnerEditComponent implements OnInit {
  runnerForm = this.fb.group({
    name: [this.data.name, [Validators.required]],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RunnerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Runner
  ) {
    console.log('RunnerEditComponent.constructor');
    console.log(this.data);
  }

  ngOnInit() {
    console.log('RunnerEditComponent.ngOnInit');
    console.log(this.data);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(){
    console.log('RunnerEditComponent.submit');
  }

  editDialogRunner(runner: Runner): void {
    console.log('RunnerEditComponent.editDialogRunner');
    console.log(runner);
  }
}
