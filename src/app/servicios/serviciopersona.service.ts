import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class ServiciopersonaService {
  constructor( private http:HttpClient) { }

  _miUrl : string = 'http://localhost:9000/api/v1/persona/';

  getDomicilios(){}

  getAll(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this._miUrl);
  }

  getOne(id:number): Observable<Persona>{
    return this.http.get<Persona>(this._miUrl + id);
  }

  post(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this._miUrl, persona);
  }

  put (id:number, persona:Persona): Observable<Persona> {
    return this.http.put<Persona>(this._miUrl + id, persona);
  }

  delete(id : number) : Observable<any>{
    return this.http.delete(this._miUrl + id);
  }
}
