import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Employee} from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // TODO: Re-Verify urlConnect in the backend
  private urlConnect = 'http://localhost:8080/Backend/Security';
  //TODO : Modify POST_Mapping Function in Backend for GetEmployees
  private urlGetEmployees ='http://localhost:8080/BackEnd/Employee/';

  constructor(private http: HttpClient) {
  }

  //this function is use to login with Crypt (Basic Authentication in the backend
  public login(username: string, password: string) {
    console.log(username);
    console.log(password);
    const headers = new HttpHeaders({Authorization: ('Basic' + btoa(username + ':' + password))});
    return this.http.get<any>(this.urlConnect, {headers})
  }
  //this function is  used to get all employees from our database
  public getEmployees(){
    return this.http.get<Employee>(this.urlGetEmployees);
  }
  public getSpecifiedRole(username:string){
    let opts : { params : HttpParams};
    opts ={ params: new HttpParams({fromString:`username=${username}`})};
    return this.http.get<any>(this.urlGetEmployees,opts);
  }
}
