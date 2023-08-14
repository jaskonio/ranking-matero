import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonEditComponent } from './edit/person.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { Participant, PersonService } from '../person.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy{
  participants:Participant[] = [];

  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'first_name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Apellido',
      field: 'last_name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Foto',
      field: 'photo_url',
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
          click: record => this.editParticipant(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: 'delete',
          tooltip: 'delete',
          pop: {
            title: '¿Quieres eliminar al participante?',
            closeText: 'cerrar',
            okText: 'eliminar',
          },
          click: record => this.removeParticipant(record),
        },
      ],
    },
  ];

  isLoading = true;
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

  constructor(public dialog: MatDialog,
    private _personService:PersonService,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService) {
      this.getAllParticipants();
  }

  ngOnInit() {
    this.getAllParticipants();
  }

  ngOnDestroy() {
  }

  addNewPerson() {
    const dialogRef = this.dialog.open(PersonEditComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((person:Participant) => {
      console.log('addNewPerson.afterAllClosed');

      if(person == undefined) {
        return;
      }

      this.addNewParticipant(person);
    });
  }

  editParticipant(participant:Participant){
    console.log('editParticipant');
    console.log(participant);

    const dialogRef = this.dialog.open(PersonEditComponent, {
      autoFocus: false,
      disableClose: true,
      data: participant
    });

    dialogRef.afterClosed().subscribe((person:Participant) => {
      console.log('editParticipant.afterClosed');

      if(person == undefined) {
        return;
      }

      this.updateParticipant(person);
    });
  }

  removeParticipant(participant:Participant){
    console.log(participant);
    if(participant.id == null || participant.id == undefined){
      return;
    }

    this._personService.delete(participant.id!).subscribe(data=>{
      console.log(data);
      this._toast.info('Se ha eliminado correctamente', 'Participante');
      this.getAllParticipants();
    });
  }

  getAllParticipants() {
    this.isLoading = true;

    this._personService.getAll().subscribe( data => {
      console.log('Get All Participant');
      console.log(data);
      this.participants = data;
      this.total = this.participants.length;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    () => {
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    () => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  addNewParticipant(participant:Participant){
    this._personService.add(participant).subscribe((data:any) => {
      console.log(data);
      this._toast.info('Se ha creado correctamente', 'Participante');

      this.getAllParticipants();
    });
  }

  updateParticipant(participant:Participant) {
    this._personService.update(participant).subscribe(data=>{
      console.log('updateParticipant.end');
      console.log(data);
      this._toast.info('Se ha actualizado correctamente', 'Participante');

      this.getAllParticipants();
    });
  }
}
