import { HttpClient } from '@angular/common/http';

export class BaseHTTP_Service {
  baseUrl = 'https://ranking-api-jpzy.onrender.com';
  // baseUrl = 'http://127.0.0.1:8000';

  constructor(public http: HttpClient) {}
}
