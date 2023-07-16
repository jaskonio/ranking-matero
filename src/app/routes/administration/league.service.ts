import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Runner } from './race.service';
import { BaseHTTP_Service } from './base.service';

export interface RaceFromLeague {
  id?: string;
  name: string;
  url: string;
  order: number;
  ranking?: Runner[];
  sorted?: boolean;
  runnerDisqualified?: RunnerParticipant[]
}

export interface RankingView {
  position: number;
  photo: string;
  points: number;
  name: string;
  pos_last_race: number;
  top_five: number;
  participations: number;
  best_position: string;
  last_position_race: number;
  best_avegare_peace: string;
  best_position_real?: number;
}

export interface RunnerParticipant {
  name: string;
  last_name: string;
  photo: string;
  dorsal?: number;
  club?: string;
  nationality?: string;
  gender?: string;
  category?: string;
  person_id?: string;
}

export interface League {
  id?: string
  name: string;
  races?: RaceFromLeague[];
  final_ranking: RankingView[];
  runnerParticipants?: RunnerParticipant[]
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
