import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

export class BaseHTTP_Service {  
  baseUrl = environment.apiData;

  constructor(public http: HttpClient) {}
}
