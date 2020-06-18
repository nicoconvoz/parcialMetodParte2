import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Domicilio } from '../modelo/domicilio';

@Injectable({
  providedIn: 'root'
})
export class ServiciodomicilioService {

  
  constructor( private http:HttpClient) { }

  _miUrl : string = 'http://localhost:9000/api/v1/domicilio/';

  getDomicilios(){}

  getAll( id:number): Observable<Domicilio[]>{
    return this.http.get<Domicilio[]>(this._miUrl + 'query/' + id);
  }

  getOne(id:number): Observable<Domicilio>{
    return this.http.get<Domicilio>(this._miUrl + id);
  }

  post(domicilio: Domicilio): Observable<Domicilio>{
    return this.http.post<Domicilio>(this._miUrl, domicilio);
  }

  put (id:number, domicilio:Domicilio): Observable<Domicilio> {
    return this.http.put<Domicilio>(this._miUrl + id, domicilio);
  }

  delete(id : number) : Observable<any>{
    return this.http.delete(this._miUrl + id);
  }
}
