import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Participant } from '../../person.service';

@Component({
  selector: 'app-race-edit',
  templateUrl: './race.component.html'
})
export class RaceEditComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RaceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participant
  ) {
    console.log('PersonEditComponent.constructor');
    console.log(this.data);
  }

  ngOnInit() {
    console.log('PersonEditComponent.ngOnInit');
    console.log(this.data);
  }
}
