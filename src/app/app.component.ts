import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from './dbhelper/user.service';
import { users } from './dbhelper/user.interface';
import { ToastrService } from 'ngx-toastr';
import { DBOperation } from './dbhelper/db-operation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'angularreg';
    addFrom: FormGroup; // = new FormGroup({})
    submitted: boolean = false;
    users: users[] = [];

    buttonTxt : string ;
    dbops     : DBOperation; 
    @ViewChild('nav') elfile :any ;  

    constructor(private _Userservice: UserService, private toastr: ToastrService) {

    }

    ngOnInit() {
        this.setFormState();
        this.getUsers();
        this.toastr.success("Hello world");
    }

    setFormState() 
    {
        this.buttonTxt = 'Save' ;
        this.dbops     = DBOperation.add ;     
     
        this.addFrom = new FormGroup({
            id: new FormControl(0),
            title: new FormControl('', Validators.compose([Validators.required])),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])), // Validators.pattern()
            dob: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
            confirmpassword: new FormControl('', Validators.compose([Validators.required])),
            acceptTerms: new FormControl(false, Validators.compose([Validators.requiredTrue]))
        })
    }

    tabChange()
    {
        this.resetdata();
    }

    registration() {
        this.submitted = true;
        if (this.addFrom.invalid) {
            alert('Validation Falied');
        } else {
           
            switch( this.dbops){
                 case DBOperation.add :
                    console.log('add'); 
                    this._Userservice.addUsers(this.addFrom.value).subscribe(res=>{

                    });
                    this.getUsers() ; 

                 break;
                 case DBOperation.update :
                    this._Userservice.updateUsers(this.addFrom.value).subscribe(res=>{

                    });
                    console.log('update'); 
                    this.getUsers() ; 
                 break;
            }

        }
    } 

    resetdata() 
    {
        this.buttonTxt = 'Save' ;
        this.dbops     = DBOperation.add ;    
        console.log('This is Reset Button Call');
        this.addFrom.reset();
    }

    getUsers() 
    {
        this._Userservice.getAllUsers().subscribe((res: users[]) => {
            debugger;
            console.log(res);
            this.users = res;
        });
    }

    getEdit(Id: number) 
    {
        this.buttonTxt = 'Update' ;
        this.dbops     = DBOperation.update ;
       
        let user = this.users.find(( u : users) => u.id === Id);
        this.addFrom.patchValue(user); 
        this.elfile.select('addtab')
        alert(Id);
    }

    getDelete(Id: number) {
        this._Userservice.deleteUsers(Id).subscribe(res =>{
            this.getUsers() ; 
            console.log(res);
        })
    }
}
