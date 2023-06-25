import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map } from 'rxjs';


export interface Participant {
  id?: string;
  first_name: string;
  last_name: string;
  photo: string;
  photo_url: string;
}

export interface ParticipantResponse {
  items: Participant[];
  meta: object;
  message: string;
}


@Injectable()
export class PersonService {
  baseUrl = 'https://ranking-api-jpzy.onrender.com';
  personUrl = 'https://ranking-api-jpzy.onrender.com/persons/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ParticipantResponse>(this.personUrl).pipe(
      map(result => result.items),
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
