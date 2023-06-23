import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person.component.html'
})
export class PersonEditComponent implements OnInit {
  personForm1 = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    last_name: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PersonEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {}

  submitPerson(){
    console.log('submitPerson');
    console.log(this.personForm1.value);
    this.dialogRef.close(this.personForm1.value);
  }

  close() {
    this.dialogRef.close();
  }
}
