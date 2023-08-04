import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHTTP_Service } from './base.service';

export interface Runner {
  id: string,
  first_name: string,
  last_name: string,
  nationality: string,
  gender: string,
  photo: string,
  photo_url: string,
  dorsal: string,
  club: string,
  category: string,
  position: number
  finished: boolean,
  is_disqualified: boolean,
  official_time: string,
  official_pos: string,
  official_avg_time: string,
  official_cat_pos: string,
  official_gen_pos: string,
  real_time: string,
  real_pos: string,
  real_avg_time: string,
  real_cat_pos: string,
  real_gen_pos: string,
  points: number,
  posiciones_ant: number[],
  averages_ant: string[],
  position_general_ant: number[]
}

export interface Race {
  id?: string;
  name: string;
  url: string;
  ranking?: Runner[];
  order?: number;
  is_sorted?: boolean;
}

export interface RaceResponse {
  items: Race[];
  meta: object;
  message: string;
}

@Injectable()
export class RaceService extends BaseHTTP_Service {
  raceUrl = this.baseUrl + '/races/';

  constructor(_http: HttpClient) {
    super(_http);
  }

  getAll() {
    return this.http.get<Race[]>(this.raceUrl);
  }

  getById(id:string) {
    return this.http.get<Race>(this.raceUrl + id);
  }

  add(Race:Race) {
    return this.http.post(this.raceUrl, Race);
  }

  delete(id:string) {
    console.log('delete');
    return this.http.delete<Race>(this.raceUrl + id);
  }

  update(race:Race) {
    const id = race.id;

    return this.http.put(this.raceUrl + id, race);
  }
}
