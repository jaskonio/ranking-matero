import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


export interface Participant {
  id?: string;
  first_name: string;
  last_name: string;
  photo: string;
}

export interface ParticipantResponse {
  items: Participant[];
  meta: object;
  message: string;
}


@Injectable()
export class PersonService {
  baseUrl = 'https://ranking-api-jpzy.onrender.com/persons/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ParticipantResponse>(this.baseUrl).pipe(
      map(result => result.items),
    );
  }

  getById(id:string) {
    return this.http.get<Participant>(this.baseUrl + id);
  }

  add(participant:Participant) {
    return this.http.post(this.baseUrl, participant);
  }
  delete(id:string) {
    console.log('delete');
    return this.http.delete<Participant>(this.baseUrl + id);
  }
}
