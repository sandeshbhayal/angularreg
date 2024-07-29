import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { users } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }

  createDb(){
    let users : users[] = [
      {id: 1 , title : 'Mr.' , firstName : "Sandesh" , lastName : "Bhayal" ,  email : "sandeshbhayal@gmail.com" , dob : '24-10-1992' ,  password : 'sandesh@123' , acceptTerms : true}, 
      {id: 2 , title : 'Mr.' , firstName : "Sanohar" , lastName : "Rana" ,  email : "sanohar@gmail.com" , dob : '20-09-1992' ,  password : 'sanohar@123' , acceptTerms : true},
      {id: 3 , title : 'Mr.' , firstName : "kapil" , lastName : "Hardaha" ,  email : "kapil@gmail.com" , dob : '15-08-1992' ,  password : 'kapil@123' , acceptTerms : true},
      {id: 4 , title : 'Mr.' , firstName : "Amit" , lastName : "Nagar" ,  email : "amit@gmail.com" , dob : '01-9-1992' ,  password : 'amit@123' , acceptTerms : true},
      {id: 5 , title : 'Mr.' , firstName : "Pawan" , lastName : "Patel" ,  email : "pawan@gmail.com" , dob : '12-10-1993' ,  password : 'paawan@123' , acceptTerms : true},
      {id: 6 , title : 'Mr.' , firstName : "Ravindra" , lastName : "Birla" ,  email : "ravindra@gmail.com" , dob : '05-10-1994' ,  password : 'ravindra@123' , acceptTerms : true}
    ]; 
    return {users} ; 
  }
}
