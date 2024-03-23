import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  myData = new BehaviorSubject<any>(null);
  dataShared = this.myData.asObservable();

  urlOneGene = "http://localhost:4100/generations/oneGen/";
  urlOneBranch = "http://localhost:4100/branches/oneBranch/";
  urlAllBranches = "http://localhost:4100/branches/allBranches";

  constructor(private http: HttpClient) { }

  public getGene(gen:string): Observable<any> {
    return this.http.get(`${this.urlOneGene}${gen}`);
  }
  public getBranch(bra:string): Observable<any> {
    return this.http.get(`${this.urlOneBranch}${bra}`);
  }
  public getBranches(): Observable<any> {
    return this.http.get(this.urlAllBranches);
  }

  public shareData(data:any) {
    this.myData.next(data);
  }
}