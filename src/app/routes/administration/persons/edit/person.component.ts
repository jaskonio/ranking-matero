import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from '../../person.service';
import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person.component.html'
})
export class PersonEditComponent implements OnInit {
  personForm1 = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    photo: ['', []],
  });

  file_avatar:File|null = null;

  avatar_url = '/assets/images/avatars/default.png';
  _avatar_src = '';

  set avatar_src(content:string){
    this._avatar_src = content;
    this.personForm1.get('photo')?.setValue(this.avatar_src);
  }

  get avatar_src(){
    return this._avatar_src;
  }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _imageCompressService:NgxImageCompressService,
    public dialogRef: MatDialogRef<PersonEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participant,
  ) {
    console.log('PersonEditComponent.constructor');
    console.log(this.data);

    if(this.data == null) {
      return;
    }

    this.avatar_src = this.data.photo;
    this.personForm1.get('first_name')?.setValue(this.data.first_name);
    this.personForm1.get('last_name')?.setValue(this.data.last_name);
  }

  ngOnInit() {
    console.log('PersonEditComponent.ngOnInit');
    console.log(this.data);

    if (this.data == undefined || this.data == null) {
      this.http.get(this.avatar_url, { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.avatar_src = reader.result as string;
        };

        reader.readAsDataURL(res);
      });
      return;
    }
  }

  submitPerson(){
    console.log('submitPerson');
    console.log(this.personForm1.value);

    const data:Participant = {
        first_name: this.personForm1.value.first_name as string,
        last_name: this.personForm1.value.last_name as string,
        photo: this.personForm1.value.photo as string,
        photo_url: ''
    };

    if(this.data != undefined) {
      data.id = this.data.id;
    }

    console.log(data);
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }

  handleFileInputChange() {
    return this._imageCompressService.uploadFile()
    .then(({ image, orientation, fileName }: UploadResponse) => {

      this._imageCompressService
        .compressFile(image, orientation, 50, 50)
        .then((result: DataUrl) => {
          this.avatar_src = result;
          console.log(`Compressed: ${result.substring(0, 50)}... (${result.length} characters)`);
          console.log('Size in kilobyte is now:', this._imageCompressService.byteCount(result)/1024);
        });
    });
  }
}
