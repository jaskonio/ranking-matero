import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Runner {
  finished: boolean;
  officialTime: string;
  officialPos: number;
  officialAverageTime: string;
  officialCatPos: number;
  officialGenPos: number;
  realTime: string;
  realPos: number;
  realAverageTime: string;
  realCatPos: number;
  realGenPos: number;
  name: string;
  last_name: string;
  dorsal: number;
  club: string;
  nationality: string;
  gender: string;
  category: string;
  photo: string;
  race_id: string;
  puntos: number;
  posiciones_ant: number[],
  photo_data: string;
}

export interface Race {
  id?: string;
  name: string;
  url: string;
  processed: boolean;
  sorted: boolean;
  ranking: Runner[];
  proceesEnabled: boolean;
}

export interface RaceResponse {
  items: Race[];
  meta: object;
  message: string;
}


@Injectable()
export class RaceService {
  baseUrl = 'https://ranking-api-jpzy.onrender.com';
  raceUrl = 'https://ranking-api-jpzy.onrender.com/races/';

  constructor(private http: HttpClient) {}

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
