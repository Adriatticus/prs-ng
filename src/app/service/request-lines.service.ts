// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// const URL = 'http://localhost:8080/api/lineitems/lines-for-req'

// @Injectable({
//   providedIn: 'root'
// })
// export class RequestLinesService {
//   constructor(private http: HttpClient) {}

//   list(): Observable<Requestlines[]> {
//     return this.http.get(URL + '/') as Observable<Requestlines[]>;
//   }

//   add(requestlines: Requestlines): Observable<Requestlines> {
//     return this.http.post(URL, requestlines) as Observable<Requestlines>;
//   }

//   update(requestlines: Requestlines): Observable<Requestlines> {
//     return this.http.put(URL + '/' + requestlines.id, requestlines) as Observable<Requestlines>;
//   }

//   getById(id: number): Observable<Requestlines> {
//     return this.http.get(URL + '/' + id) as Observable<Requestlines>;
//   }

//   delete(id: number): Observable<any> {
//     return this.http.delete(URL + '/' + id) as Observable<Requestlines>;
//   }
// }
