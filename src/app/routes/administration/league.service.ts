import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Runner } from './race.service';
import { BaseHTTP_Service } from './base.service';

export interface League {
  id?: string
  name: string;
  races?: RaceFromLeague[];
  ranking: RankingView[];
  runners?: RunnerParticipant[]
}

export interface RaceFromLeague {
  id?: string;
  name: string;
  url: string;
  ranking?: Runner[];
  order: number;
  is_sorted?: boolean;
}

export interface RankingView {
  id: string;
  first_name: string;
  last_name: string;
  nationality: string;
  gender: string;
  photo: string;
  photo_url: string;
  position: number;
  points: number;
  pos_last_race: number;
  top_five: number;
  participations: number;
  best_position: string;
  last_position_race: string;
  best_avegare_peace: string;
  best_position_real: number;
}

export interface RunnerParticipant {
  id?: string;
  first_name: string;
  last_name: string;
  nationality: string;
  gender: string;
  photo: string;
  photo_url: string;
  dorsal?: number;
  club?: string;
  category?: string;
}


@Injectable()
export class LeagueService extends BaseHTTP_Service{
  leagueUrl = this.baseUrl + '/leagues/';

  constructor(_http: HttpClient) {
    super(_http);
  }

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
