import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonEditComponent } from './edit/person.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy{


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


  addNewPerson() {
    const dialogRef = this.dialog.open(PersonEditComponent, {
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((person:any) => {
      console.log('afterAllClosed');

      if(person != undefined) {
        console.log(person);
      }
    });
  }
}
