import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from './dbhelper/user.service';
import { users } from './dbhelper/user.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'angularreg';
    addFrom : FormGroup; // = new FormGroup({})
    submitted : boolean = false ; 
    users  : users[] = [] ; 
    constructor( private _Userservice : UserService)
    {

    }

    ngOnInit()
    {
        this.setFormState();
        this.getUsers() ; 
    }

    setFormState() {
        this.addFrom = new FormGroup({
            id                  : new FormControl(0),
            title               : new FormControl('' ,Validators.compose([Validators.required])),
            firstName           : new FormControl('' ,Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])),
            lastName            : new FormControl('' ,Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])),
            email               : new FormControl('' ,Validators.compose([Validators.required,Validators.email])), // Validators.pattern()
            dob                 : new FormControl('' ,Validators.compose([Validators.required])),  
            password            : new FormControl('' ,Validators.compose([Validators.required,Validators.minLength(5)])),            
            confirmpassword     : new FormControl('' ,Validators.compose([Validators.required])),
            acceptTerms         : new FormControl(false , Validators.compose([Validators.requiredTrue]))
        })
    }

    

    registration(){
        this.submitted = true ; 
        if(this.addFrom.invalid){
            alert('Validation Falied'); 
        }else{
            alert('Validation Success !!') ; 
        }
    }z

    resetdata(){
        console.log('This is Reset Button Call');
        this.addFrom.reset() ; 
    }

    getUsers(){
        this._Userservice.getAllUsers().subscribe((res : users[]) => {
            debugger ; 
            console.log(res) ; 
            this.users = res ; 
        });
    }
}
