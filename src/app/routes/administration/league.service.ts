import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Race } from './race.service';

export interface RunnerParticipant {
  id?: string;
  name: string;
  last_name: string;
  dorsal: number;
  club: string;
  nationality: string;
  gender: string;
  category: string;
  photo: string;
  person_id: string;
}

export interface League {
  id?: string
  name: string;
  races?: Race[];
  final_ranking?: any;
  runnerParticipants?: RunnerParticipant[]
}

@Injectable()
export class LeagueService {
  baseUrl = 'https://ranking-api-jpzy.onrender.com';
  leagueUrl = 'https://ranking-api-jpzy.onrender.com/leagues/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<League[]>(this.leagueUrl);
  }

  getById(id:string) {
    return this.http.get<League>(this.leagueUrl + id);
  }

  add(league:League) {
    return this.http.post<League>(this.leagueUrl, league);
  }

  delete(id:string) {
    console.log('delete');
    return this.http.delete(this.leagueUrl + id);
  }

  update(league:League) {
    const id = league.id;

    return this.http.put(this.leagueUrl + id, league);
  }
}
