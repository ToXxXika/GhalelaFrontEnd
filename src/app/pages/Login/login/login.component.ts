import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Login} from '../../../Models/Login';
import {LoginService} from '../../../Services/login.service';
import {Router} from '@angular/router';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
//TODO :
export class LoginComponent implements OnInit {
     Log: Login = new Login();
  constructor(private LoginService: LoginService,private messageService:MessageService,private router: Router) { }

  ngOnInit(): void {
  }
  ClearData(){

  }
// TODO : need to add more constraints to Inputs
  CheckInputs(username:any,password: any):boolean{
    if((username.length==0)||(password.length==0)){
      this.messageService.add({key:"SS",severity:"warn",detail:"les champs sont vides "});
      return  false ;
    }else {
      return true ;
    }
  }
  //User Verification
  username: any;
  password: any;
  //this function is used to Load/Create Keys for Local Saving
  // TODO : Verify if this works after
  public LoadLocalstorageKeys(KeyName: string):string{
    switch (KeyName) {
      case 'KeyNom': {
        return 'NomLocal';
      }
      case 'KeyPrenom':{
        return 'PrenomLocal';
      }
      case 'KeyRole':{
        return  'RoleLocal';
      }

      case 'KeyMail':{
        return 'MailLocal';
      }
      case 'KeyBoutique':{
        return  'BoutiqueLocal';
      }
      case 'KeyCin':{
        return 'CinLocal';
      }
      case 'KeyTag':{
        return  'Localuser';
      }
      case 'KeyTel':{
        return 'NumLocal';
      }
      case 'KeyNaissance':{
        return 'NaissanceLocal';
      }
      default : alert('KeyNotFound');
        break;
    }
  }
  VerifUser() {
     const username= this.username;
     const password = this.password;
     if(this.CheckInputs(username,password)){
       this.LoginService.login(username,password).subscribe(data=>{
         // TODO: do not forget Guard Here
         if(data["authenticated"] === false){
           this.messageService.add({key:'SS',severity:'danger',detail:"User Not Found"})
         }else{
           this.messageService.add({key:'SS',severity:'success',detail:"Welcome "+username});
           // @ts-ignore
           setTimeout(1000);
           //this is used for Security Purposes &
           let RoleGuard="";
           // SpecUser= Specified User
           this.LoginService.getSpecifiedRole(username).subscribe(SpecUser=>{
             localStorage.setItem(this.LoadLocalstorageKeys('KeyNom'),SpecUser['Nom']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyPrenom'),SpecUser['Prenom']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyCin'),SpecUser['Cin']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyMail'),SpecUser['adresse']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyTag'),SpecUser['username']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyTel'),SpecUser['Telephone']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyRole'),SpecUser['Poste']);
             localStorage.setItem(this.LoadLocalstorageKeys('KeyNaissance'),SpecUser['DateNaissance']);
               switch (SpecUser['Poste']) {
                 case 'Employee':
                   //TODO : Work Here
                   break;
                 case 'Gerant': //TODO : Work Here
                   break;
                 case 'Client': //TODO : Work Here
                   break ;
                 default: // TODO : Work here
               }
           })
           //TODO : Re-verify this function : Possibility of failure due to URL
           this.router.navigateByUrl("/dashboard")

         }
       })

     }

  }
}
