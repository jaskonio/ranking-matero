import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Participant } from '../../person.service';
import { Race } from '../../race.service';

@Component({
  selector: 'app-race-add',
  templateUrl: './race-add.component.html'
})
export class RaceAddComponent implements OnInit {
  raceForm = this.fb.group({
    name: ['', [Validators.required]],
    url: ['', [Validators.required]],
    processed: [false],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RaceAddComponent>
  ) {
    console.log('RaceAddComponent.constructor');
  }

  ngOnInit() {
    console.log('RaceAddComponent.ngOnInit');
  }

  closeDialog(){
    this.dialogRef.close();
  }
  submit(){
    console.log('RaceAddComponent.submit');
    console.log(this.raceForm.value);

    const data:Race = {
        name: this.raceForm.value.name as string,
        url: this.raceForm.value.url as string,
        is_sorted: !this.raceForm.value.processed as boolean
    };

    this.dialogRef.close(data);
  }
}
