import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { users } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_BASE_PATH: string = "http://localhost:4200/api/";
  constructor(private _httpClient: HttpClient) {

  }

  getAllUsers() {
    return this._httpClient.get(this.API_BASE_PATH + 'users')
  }


  getUsersByID(id: number) {
    return this._httpClient.get( `${this.API_BASE_PATH}users/${id}`)
  }

  addUsers(user : users){
    return this._httpClient.post(`${this.API_BASE_PATH}users` , user)
  }

  updateUsers(user : users){
    return this._httpClient.post(`${this.API_BASE_PATH}users/${user.id}` , user)
  }

  deleteUsers(userId : users){
    return this._httpClient.delete(`${this.API_BASE_PATH}users/${userId}`)
  }

}
