import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lineitem } from '../model/lineitem';

const URL = 'http://localhost:8080/api/lineitems'
const OURL = 'http://localhost:8080/api/lineitems/lines-for-req'

@Injectable({
  providedIn: 'root'
})
export class LineitemService {
  constructor(private http: HttpClient) {}

  list(): Observable<Lineitem[]> {
    return this.http.get(URL + '/') as Observable<Lineitem[]>;
  }

  add(lineitem: Lineitem): Observable<Lineitem> {
    return this.http.post(URL, lineitem) as Observable<Lineitem>;
  }

  update(lineitem: Lineitem): Observable<Lineitem> {
    return this.http.put(URL + '/' + lineitem.id, lineitem) as Observable<Lineitem>;
  }

  getById(id: number): Observable<Lineitem> {
    return this.http.get(URL + '/' + id) as Observable<Lineitem>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<Lineitem>;
  }

  getLinesForRequest(id: number): Observable<Lineitem[]> {
    return this.http.get(OURL + '/' + id) as Observable<Lineitem[]>;
  }

}
