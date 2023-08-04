import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { BaseHTTP_Service } from './base.service';

export interface Participant {
  id?: string;
  first_name: string;
  last_name: string;
  nationality: string;
  gender: string;
  photo: string;
  photo_url: string;
}


@Injectable()
export class PersonService extends BaseHTTP_Service {
  personUrl = this.baseUrl + '/persons/';

  constructor(_http: HttpClient) {
    super(_http);
  }

  getAll() {
    return this.http.get<Participant[]>(this.personUrl)
    .pipe(
      map(participants => {
        participants.forEach(item => {
          item.photo_url = this.baseUrl + item.photo_url;
        });
        return participants;
      })
      );
  }

  getById(id:string) {
    return this.http.get<Participant>(this.personUrl + id);
  }

  add(participant:Participant) {
    return this.http.post(this.personUrl, participant);
  }

  delete(id:string) {
    console.log('delete');
    return this.http.delete<Participant>(this.personUrl + id);
  }

  update(participant:Participant) {
    const id = participant.id;
    const body:any = {};

    body.first_name = participant.first_name;
    body.last_name = participant.last_name;
    body.photo = participant.photo;

    return this.http.put(this.personUrl + id, body);
  }
}
